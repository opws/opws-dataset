Any new domain profiles should be in the appropriate location, as described in
the "Layout" section of [README.md][].

Profiles should have this information at the very least (see [docs/fields.md][]
for details):

[README.md]: README.md
[docs/fields.md]: docs/fields.md

```yaml
name: Site Name Here # How would you refer to this site in a sentence?
password:
  value:
    length:
      min: 1 # What is their minimum password size? Is there a maximum?
  reset:
    url: https://example.com/resetpassword
    flow: # assuming the usual request-email-visit-change flow
      request:
        accepts: email # Does the reset page accept email address, or username?
  change:
    url: https://example.com/account/changepassword
    form:
      oldpassword:
        input: required # Do you have to enter the old password? ("none" if not)
registration:
  url: https://example.com/register
login:
  url: https://example.com/login
reviewed:
  date: 1970-01-01T00:00:00.000Z # use https://www.isotimestamp.com/
```

If you check the password reset functionality, the profile should include
(again, assuming the usual password reset flow):

```yaml
password:
  reset:
    flow:
      request:
        accepts: email # Does the reset page accept email address, or username?
        captcha: word # Is there a captcha?
      response:
        email:
          sender: sender@example.com # What address does a reset email come from?
          body: username url # Does the email contain a URL? A link? User info?
        expire: 24h # How long until the link expires?
      submit:
        destination:
          page: profile # What kind of page does submitting take you to?
        sessions:
          own: login # Is the user auto-logged in, or just directed to do so?
        expire: now # Can the link be revisited after use?
    change:
      form:
        newpassword:
          characters: hidden # Can you see what you're typing?
        repeat:
          newpassword:
            input: required # Do you have to type the new password twice?
```
