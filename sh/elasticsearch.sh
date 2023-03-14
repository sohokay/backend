#!/bin/bash

# Set variables
ES_VERSION="8.6.2"
ES_DOWNLOAD_URL="https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-${ES_VERSION}-linux-x86_64.tar.gz"
# https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-8.6.2-linux-x86_64.tar.gz

#
yum update -y
yum install -y wget
yum install -y curl
yum install -y tar


# Install Java
yum install -y java-11-openjdk

# Download and extract Elasticsearch
curl -L "${ES_DOWNLOAD_URL}" -o /tmp/elasticsearch.tar.gz
tar -zxvf /tmp/elasticsearch.tar.gz -C /opt/
mv /opt/elasticsearch-${ES_VERSION} /opt/elasticsearch

# adduser se

# passwd sj15072841494

# chown 777 se /opt/elasticsearch
# chown -R se /opt/elasticsearch
# su se



# ✅ Elasticsearch security features have been automatically configured!
# ✅ Authentication is enabled and cluster connections are encrypted.

# ℹ️  Password for the elastic user (reset with `bin/elasticsearch-reset-password -u elastic`):
#  iKGU3eytXr36V1U5koT7

# ℹ️  HTTP CA certificate SHA-256 fingerprint:
#   7f0d77ceb17b3d01381f4e09040a13545b9a6e64a955ab10eaa78d09132d7d95

# ℹ️  Configure Kibana to use this cluster:
# • Run Kibana and click the configuration link in the terminal when Kibana starts.
# • Copy the following enrollment token and paste it into Kibana in your browser (valid for the next 30 minutes):
 #  eyJ2ZXIiOiI4LjYuMiIsImFkciI6WyIxNzIuMjMuNzEuMTk6OTIwMCJdLCJmZ3IiOiI3ZjBkNzdjZWIxN2IzZDAxMzgxZjRlMDkwNDBhMTM1NDViOWE2ZTY0YTk1NWFiMTBlYWE3OGQwOTEzMmQ3ZDk1Iiwia2V5IjoieS1qWDRJWUItQ2h1eW5WNFVSQi06cjI4dHNLcVpSR2VUMElwWXFNY3ZWZyJ9

# ℹ️  Configure other nodes to join this cluster:
# • On this node:
#   ⁃ Create an enrollment token with `bin/elasticsearch-create-enrollment-token -s node`.
#   ⁃ Uncomment the transport.host setting at the end of config/elasticsearch.yml.
#  ⁃ Restart Elasticsearch.
# • On other nodes:
#   ⁃ Start Elasticsearch with `bin/elasticsearch --enrollment-token <token>`, using the enrollment token that you generated.


# Configure Elasticsearch
#cat << EOF > /opt/elasticsearch/config/elasticsearch.yml
#cluster.name: mycluster
#node.name: ${HOSTNAME}
#path.data: /var/lib/elasticsearch
#path.logs: /var/log/elasticsearch
#EOF

# Start Elasticsearch service
systemctl daemon-reload
systemctl enable elasticsearch.service
systemctl start elasticsearch.service
