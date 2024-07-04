_CURRENT_DIRECTORY=$(dirname $(realpath "$0"))


# convert link to files
rm $_CURRENT_DIRECTORY/razomy/python
cp -a $_CURRENT_DIRECTORY/../python/razomy/python $_CURRENT_DIRECTORY/razomy/python

gcloud run deploy function --source . --region us-central1 --port=8000

# convert files to link
rm -rf $_CURRENT_DIRECTORY/razomy/python
ln -sf $_CURRENT_DIRECTORY/../python/razomy/python $_CURRENT_DIRECTORY/razomy/python
