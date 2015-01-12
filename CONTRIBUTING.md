Profiles should have this information at the very least (see [README.md][] for details):

[README.md]: README.md

```yaml
name: Site Name Here # How would you refer to this site in a sentence?
password:
  rules:
    length:
      min: 1 # What is their minimum password size? Is there a maximum?
  reset:
    url: https://example.com/resetpassword
    accept: email # Does the reset page accept email address, or username?
  change:
    url: https://example.com/account/changepassword
    reauth: password # Do you have to enter the old password? ("no" if not)
register:
  url: https://example.com/register
login:
  url: https://example.com/login
https: enforced # What happens if you start a url with "http:"? With "https:"?
```
