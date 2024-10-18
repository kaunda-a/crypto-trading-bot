#!/bin/bash

# Install Prometheus
wget https://github.com/prometheus/prometheus/releases/download/v2.37.0/prometheus-2.37.0.linux-amd64.tar.gz
tar xvfz prometheus-*.tar.gz
cd prometheus-*

# Start Prometheus
./prometheus --config.file=prometheus.yml &

# Install Grafana
wget https://dl.grafana.com/oss/release/grafana-8.5.2.linux-amd64.tar.gz
tar -zxvf grafana-8.5.2.linux-amd64.tar.gz

# Start Grafana
cd grafana-8.5.2
./bin/grafana-server &

echo "Prometheus and Grafana have been set up and started."
