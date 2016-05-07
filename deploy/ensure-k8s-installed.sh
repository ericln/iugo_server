#!/usr/bin/env bash


# Exit on any error
set -e

# Exit if already installed
if [[ -d ~/kubernetes ]]; then
  echo "Kubernetes already installed"
  exit 0
else
  echo "Installing Kubernetes..."
fi

export K8S_VERSION=1.2.2

cd ~/kubernetes

wget "http://storage.googleapis.com/kubernetes-release/release/${K8S_VERSION}/bin/linux/amd64/kubectl"
chmod 755 kubectl
PATH=$PATH:`pwd`


