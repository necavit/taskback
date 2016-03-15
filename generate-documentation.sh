#!/bin/bash

function usage() {
  echo ""
  echo "usage: $0"
  echo "  Generates the following Taskback documentation files:"
  echo "    - docs/dev-manual.md    using the config in documentation.json"
  echo "    - docs/api/api.html     using the api.raml definition"
}

if [ $# -gt 1 ]; then
  usage
fi

dev_manual_cmd="markdown-include docs/documentation.json"
echo "[$(basename $0)] executing: $dev_manual_cmd"
eval $dev_manual_cmd
echo ""

api_html_cmd="raml2html docs/api/api.raml > public/html/api.html"
echo "[$(basename $0)] executing: $api_html_cmd"
eval $api_html_cmd
echo ""
