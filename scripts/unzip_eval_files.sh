#!/bin/bash

# Script to unzip all .eval files under src/eval_results
# Each .eval file will be extracted to a directory with the same base name

set -e  # Exit on error

# Count total files
results_dir="src/eval_results"
total=$(find $results_dir -name "*.eval" -type f | wc -l)
echo "Found $total .eval files to unzip"

# Counter for progress
count=0

# Find and process each .eval file
find $results_dir -name "*.eval" -type f | while read -r eval_file; do
    count=$((count + 1))

    # Get the directory containing the file
    dir=$(dirname "$eval_file")

    # Get the base name without .eval extension
    base=$(basename "$eval_file" .eval)

    # Create target directory
    target_dir="$dir/$base"

    echo "[$count/$total] Extracting: $eval_file"

    # Create the directory if it doesn't exist
    mkdir -p "$target_dir"

    # Unzip the file into the target directory
    unzip -q -o "$eval_file" -d "$target_dir"

    echo "           -> Extracted to: $target_dir"
done

echo "Done! All .eval files have been extracted."
