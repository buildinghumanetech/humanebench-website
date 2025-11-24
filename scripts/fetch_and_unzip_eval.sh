#!/bin/bash

# Script to conditionally fetch and unzip eval results from S3
# Skips if AWS CLI is not available (e.g., on Vercel)

set -e

# Check if AWS CLI is available
if ! command -v aws &> /dev/null; then
  echo "AWS CLI not found. Skipping eval results fetch."
  echo "This is expected on Vercel or other CI environments without AWS CLI."
  echo "Using existing eval_results if available, or example data."
  exit 0
fi

# Check if we're on Vercel (Vercel sets this env var automatically)
if [ -n "$VERCEL" ]; then
  echo "Running on Vercel. Skipping eval results fetch."
  echo "Using existing eval_results if available, or example data."
  exit 0
fi

# If we get here, AWS CLI is available and we're not on Vercel
echo "Fetching latest eval results from S3..."

aws s3 cp s3://humanebench-eval-results/latest.txt latest.txt
LATEST_DIR=$(cat latest.txt)
rm -rf src/eval_results
aws s3 sync s3://humanebench-eval-results/$LATEST_DIR src/eval_results
rm latest.txt
bash scripts/unzip_eval_files.sh

echo "Eval results fetched and unzipped successfully."

