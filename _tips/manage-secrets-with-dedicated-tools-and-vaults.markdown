---
title: Manage secrets with dedicated tools and vaults
stage: Post Serie B
category: Infrastructure
---
When you need to store cryptographic secrets (other than database password, TLS certificate, …) and perform encryption with them, you should use dedicated tools. This way the cryptographic secret never leaves the tool and you get auditing features.

[https://www.vaultproject.io/](https://www.vaultproject.io/)
[https://github.com/square/keywhiz](https://github.com/square/keywhiz)
[https://aws.amazon.com/cloudhsm/](https://aws.amazon.com/cloudhsm/)
[https://aws.amazon.com/kms/](https://aws.amazon.com/kms/)
