# humanebench-website

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

View the website at [http://localhost:8080](http://localhost:8080).

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Publishing benchmark results

To upload benchmark results, run `npm run upload-eval /path/to/logs/dir`. This will upload the results to CloudFlare R2 storage and point the latest.txt file to that directory.

To quickly roll back without re-uploading results, you can edit the latest.txt file manually.

To remove an old directory, run `dotenv aws s3 rm --recursive s3://humanebench-eval-results/<old-dir-name>`

Note that for these commands to work you must have a `.env` file in your current directory with the env vars: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_DEFAULT_REGION`, and `AWS_ENDPOINT_URL` set to the values for a CloudFlare R2 API key.

Once benchmark results are uploaded, the CloudFlare Pages build process will pick them up on new PRs or commits to `main`.
