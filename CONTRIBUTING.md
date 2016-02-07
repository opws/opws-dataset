Any new domain profiles should be in the appropriate location, as described in
the "Layout" section of [README.md][].

Profiles should have this information at the very least (see [docs/fields.md][]
for details):

[README.md]: README.md
[docs/fields.md]: docs/fields.md

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
reviewed:
  date: 1970-01-01T00:00:00.000Z # use https://www.isotimestamp.com/
```
