# "Third Party Software" Report

## Table of Contents
1. [About the Project](#about-the-project)
1. [Project Status](#project-status)
1. [Getting Started](#getting-started)
1. [Deployment](#deployment)
1. [Contributing](#contributing)

## About the Project

"Third Party Software" Report is a web-based application designed to provide a heat map of in-use third party software to software development teams.

This solves the pain point of having to consciously stay on top of new releases for all the software they may have in use.

![image](https://user-images.githubusercontent.com/9577818/90268263-5c776300-de1c-11ea-8d33-7c85f3fc0d09.png)

## Project Status

[![Actions Status](https://github.com/jadametz/tps-report/workflows/Ruby/badge.svg)](https://github.com/jadametz/tps-report/actions)

* We are working toward our v0.1.0 Release, see https://github.com/jadametz/tps-report/projects/1
* Contributions welcome!

## Getting Started

### System dependencies

* Node.js v12.16.2 + Yarn
* Ruby v2.6.3

### Quick Start

1. Run setup script to install Gem dependencies, JavaScript dependencies, and bootstrap a local SQLite Database

  ```bash
  bin/setup
  ```

2. Before making changes, run tests to make sure all dependencies are satisfied and applications works correctly.

  ```bash
  bin/rspec
  ```

3. Run the application.

  ```bash
  bin/rails server
  ```

4. Go to http://localhost:3000

## Deployment

TBD

## Contributing

We encourage you to contribute to TPS Report! Please check out the
[Contributing](CONTRIBUTING.md) page for guidelines about how to proceed.
