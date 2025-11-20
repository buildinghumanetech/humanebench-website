#!/bin/bash
set -e

# This script uploads a file to a Cloudflare R2 bucket and updates
# a 'latest.txt' pointer object to the new file's name.

# --- CONFIGURATION ---
# Replace with your R2 bucket name
BUCKET_NAME="humanebench-eval-results" 
# ---------------------

# The first argument to the script is the path to the file to upload.
FILE_TO_UPLOAD=$1

if [ -z "$FILE_TO_UPLOAD" ]; then
  echo "Usage: $0 <path_to_zip_file>"
  echo "Error: No file specified for upload."
  exit 1
fi

if [ ! -f "$FILE_TO_UPLOAD" ]; then
    echo "Error: File '$FILE_TO_UPLOAD' not found."
    exit 1
fi

FILENAME=$(basename "$FILE_TO_UPLOAD")
TEMP_LATEST_FILE=$(mktemp)

echo "Preparing to upload '$FILENAME' to R2 bucket '$BUCKET_NAME'..."

echo "Step 1: Uploading the file..."
wrangler r2 object put "$BUCKET_NAME/$FILENAME" --file "$FILE_TO_UPLOAD"
echo "-> Upload successful."

echo "Step 2: Updating 'latest.txt' pointer..."
echo "$FILENAME" > "$TEMP_LATEST_FILE"
wrangler r2 object put "$BUCKET_NAME/latest.txt" --file "$TEMP_LATEST_FILE"
echo "-> 'latest.txt' now points to '$FILENAME'."

rm "$TEMP_LATEST_FILE"
echo "Done."
