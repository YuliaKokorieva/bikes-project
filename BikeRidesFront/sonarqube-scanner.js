const scanner = require('sonarqube-scanner')
require('dotenv').config()

scanner(
  {
    serverUrl: 'http://localhost:9000',
    token: process.env.REACT_APP_SONAR_TOKEN,
    options: {
      'sonar.sources': './src',
    },
  },
  () => process.exit(),
)
