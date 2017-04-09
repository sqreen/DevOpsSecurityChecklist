---
title: Store encrypted passwords in your configuration management
stage: Serie B
category: Infrastructure
---
Storing passwords (like databases ones) can be done on a dedicated database with restricted access. An other solution is to store them encrypted in your Source Code Management (SCM) system. That way, you just need the master key to decrypt them.

**Chef:** [https://github.com/chef/chef-vault](https://github.com/chef/chef-vault)

**Puppet:** [https://puppet.com/blog/encrypt-your-data-using-hiera-eyaml](https://puppet.com/blog/encrypt-your-data-using-hiera-eyaml)

**Salt:** [https://docs.saltstack.com/en/latest/ref/renderers/all/salt.renderers.gpg.html](https://docs.saltstack.com/en/latest/ref/renderers/all/salt.renderers.gpg.html)

**Ansible:** [http://docs.ansible.com/ansible/playbooks_vault.html](http://docs.ansible.com/ansible/playbooks_vault.html)
