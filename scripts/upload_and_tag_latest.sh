#!/bin/bash
set -e

# This script uploads a directory's contents to a new, timestamped directory
# in an R2 bucket using the AWS CLI, then updates 'latest.txt'.

# --- CONFIGURATION ---
BUCKET_NAME="humanebench-eval-results"
# The AWS CLI needs to be configured with credentials and the R2 endpoint URL.
# This is typically done via environment variables in a CI environment
# or via ~/.aws/config and ~/.aws/credentials locally.
#
# Required Environment Variables:
# - AWS_ACCESS_KEY_ID
# - AWS_SECRET_ACCESS_KEY
# - AWS_ENDPOINT_URL (e.g., https://<ACCOUNT_ID>.r2.cloudflarestorage.com)
# - AWS_DEFAULT_REGION (e.g., auto)
# ---

SOURCE_DIR=$1

if [ -z "$SOURCE_DIR" ]; then
  echo "Usage: $0 <path_to_logs_directory>"
  echo "Error: No source directory specified."
  exit 1
fi

if [ ! -d "$SOURCE_DIR" ]; then
    echo "Error: Source directory '$SOURCE_DIR' not found."
    exit 1
fi

# Create a timestamped directory name (e.g., results-20251119-143005)
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
DEST_DIR_NAME="results-$TIMESTAMP"
TEMP_LATEST_FILE=$(mktemp)

echo "--- Uploading evaluation results to R2 ---"

# Step 1: Recursively sync the source directory to the new timestamped directory in R2.
echo "Syncing contents of '$SOURCE_DIR' to 's3://$BUCKET_NAME/$DEST_DIR_NAME/'..."
aws s3 sync "$SOURCE_DIR" "s3://$BUCKET_NAME/$DEST_DIR_NAME/" --exclude "*.DS_Store"
echo "-> Sync successful."

# Step 2: Update 'latest.txt' to point to the new directory name.
echo "Updating 'latest.txt' to point to '$DEST_DIR_NAME'..."
echo "$DEST_DIR_NAME" > "$TEMP_LATEST_FILE"
aws s3 cp "$TEMP_LATEST_FILE" "s3://$BUCKET_NAME/latest.txt"
rm "$TEMP_LATEST_FILE"
echo "-> 'latest.txt' updated."

echo "--- Done ---"