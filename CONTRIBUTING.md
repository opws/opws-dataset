Profiles should have this information at the very least:

```yaml
name: Site Name Here # How would you refer to this site in a sentence?
password:
  rules:
    length:
      min: 6 # What is their minimum password size? Is there a maximum?
  reset:
    url: https://example.com/resetpassword
    accept: email # Does the reset page accept email, or username?
  change:
    url: https://example.com/account/changepassword
https: enforced # What happens if you start a url with "http:"? With "https:"?
```
