FROM node:12-alpine
LABEL org.label-schema.name="website-vulnerable-scan" \
    org.label-schema.description="website-vulnerable-scan Docker image" \
    org.label-schema.url="https://www.npmjs.com/package/website-vulnerable-scan" \
    org.label-schema.vcs-url="https://github.com/khulnasoft/website-vulnerable-scan" \
    org.label-schema.maintainer="khulnasoft" \
    org.label-schema.schema-version="1.0" \
    org.label-schema.docker.cmd="docker run --rm -e SCAN_URL='https://example.com' khulnasoft/website-vulnerable-scan:latest"

# Configure npm
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# Set SCAN_URL env to satisfy at build and/or container runtime.
ENV SCAN_URL="https://github.com/khulnasoft/website-vulnerable-scan"

RUN mkdir -p /home/node/website-vulnerable-scan
WORKDIR /home/node/website-vulnerable-scan

# Install from npmjs.com
RUN npm install --only=prod -g website-vulnerable-scan

# Chromium is needed for the scan
RUN apk add --no-cache chromium

COPY "./scan.sh" "/"
RUN chmod +x "/scan.sh"
ENTRYPOINT [ "/scan.sh" ]