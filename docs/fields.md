# Fields used in domain profiles

## name

The name of the site at this domain, as it would be used in a sentence.

## password.rules

Rules and requirements the site imposes on passwords.

## password.rules.length.min, password.rules.length.max

An object with the `min` and `max` lengths permitted for passwords.

`min` should only be missing if the site legitimately allows blank passwords (or allows passwords to be disabled): otherwise, `min` will be at least 1. `max` should only be missing if the site will allow passwords over 9000 characters in length. (This can usually be tested by inspecting the password element, then entering `$0.value='Aa'+new Array(9001).join('A')` before submitting.)

## password.rules.blacklist

Array of character types not allowed (such as those from rules that begin "must not contain").

## password.rules.whitelist

Array of character types that are the *only* types supported.

## password.rules.contain

Array of objects describing what classes of character (and at least how many) must be present. Usually of the form `[{letters: 1}, {numbers: 1}]`, but can be different.

(When an object lists more than one character class, it means only one of the classes must be met.)

Character class names used:

- uppers (upper case letters)
- lowers (lower case letters)
- numbers (digits)
- letters
- nonletters
- specials (when sites list "special characters": assumed to be non-alphanumeric)
- punctuation (likely contains all non-alphanumeric-or-space characters)
- symbols (probably the same as punctuation)
- nonspaces (anything that isn't whitespace)
- dot (".")
- hyphen ("-")
- underscore ("_")
- at ("@")

## password.rules.classes

Array of advanced class satisfaction rules: contains objects with `required`, as the number of classes required, and `from`, as an array of `contain` class names that can be included.

Currently, this is only used for a couple of sites whose rules can't be better explained with a `contain` list.

## password.rules.must

Array of other restrictions on what passwords *must* do (if not coverable by `contain` or `classes`).

## password.rules.mustnot

Array of other restrictions on what passwords *must not* do.

## password.reset.url

The URL of the site's "reset password" page.

## password.reset.accept

A space-separated token string of what identifiers the site needs to reset passwords. (Usually some combination of "email" and/or "username".)

When sites *require multiple* identifiers, they are joined with a plus (`+`).

## password.reset.captcha

What kind of captcha (if any) is used to deter automated password resets ("yes" if unknown).

Known captchas:

- recaptcha (http://www.google.com/recaptcha)
- botdetect (see http://captcha.com/captcha-examples.html) - when possible, the specific style in use is listed instead:
  - botdetect-vertigo

## password.reset.response.sender

What email address the password reset response comes from.

## password.reset.response.body

A space-separated token string of data the reset mechanism responds with (usually via email):

- username: Your username on the site.
- firstname: A "first name" set on your profile.
- lastname: A "last name" set on your profile.
- url: a URL (possibly linked) to the page to reset the password.
- link: A link (without the URL visible) to reset the password.
- token: A token that can be typed on a page (may also be part of a link/URL) to bring you to the reset screen.
- temp: A temporary password to use for logging in.

## password.reset.token.expires

How long after issuance the reset token is valid for, as a human-abbreviated string ("24h" is common).

## password.reset.token.expects

Space-separated string of things the password reset page expects before resetting the password. Tokens:

- "requester-ip" (IP requesting the page must be the same IP the email was requested from)

## password.reset.token.login

Whether the reset token works as login credentials. Valid values:

- "before" (the token logs you in before resetting the password)
- "after" (the token logs you in after resetting the password)
- "no" (the token does not log you in)

A value of "before" implies you may opt not to reset the password (using the reset token logs you in and you can navigate away). For sites that use a temporary password as the reset token, a value of "after" implies you are *required* to reset the password after logging in with the temporary password.

## password.change.url

The URL of the "change password" page for the logged-in user. If the site doesn't have a URL for the logged-in user, this will be in a space-and-plus-separated string denoting where to insert the variable components (such as "username").

## password.change.reauth

"no" if users can change password without reauthenticating, "password" if they have to enter the old password.

## password.change.sessions.invalidate

Whether changing your password invalidates sessions (logs you out), forcing you to log back in with the new password.

Values:

- "yes": invalidates session that changed password, probably all sessions
- "all": demonstrably invalidates all sessions
- "no": doesn't log you out, the assumed default

## password.change.usability

*(The structure of `usability` fields is currently under review, see [issue #15](https://github.com/opensets/domainprofiles/issues/15).)*

A space-separated token string describing how the password set UI differs from double-blind-entry.

Tokens:

- "single": Does not require password to be entered twice.
- "showable": Password can be toggled to plaintext.

## username.rules.\*

Rules on the format of usernames. See `password.rules`.

## username.remind.url

The URL of the page to send a username reminder to an email address (when separate from password resetting).

## username.remind.accept

A space-separated token string of what identifiers the site needs to send a username reminder. (Usually just "email".)

When sites *require multiple* identifiers, they are joined with a plus (`+`). (For example, simple.com requires an email *and* phone number, so its `username.remind.accept` value is "email+phone".)

## username.remind.captcha

What kind of captcha (if any) is used to deter automated username reminders. See `password.reset.captcha`.

## register.url

The URL of the page to create a new user account.

## register.captcha

What kind of captcha (if any) is used to deter automated user registration. See `password.reset.captcha`.

## register.usability

*(The structure of `usability` fields is currently under review, see [issue #15](https://github.com/opensets/domainprofiles/issues/15).)*

A space-separated token string describing how the password set UI differs from a form with a double-blind password field.

Tokens:

- "emailonce": requires email address to be entered once.
- "emailtwice": requires email address to be entered twice.

## login.url

The URL of the page to log in, as a user.

## login.persist.checked

If there is a checkbox to remain logged in, what the default status of that check box is.

## login.usability

*(The structure of `usability` fields is currently under review, see [issue #15](https://github.com/opensets/domainprofiles/issues/15).)*

A space-separated token string describing how the password set UI differs from traditional blind-entry.

Tokens:

- "showable": Password can be toggled to plaintext.

## login.thirdparty

*(The location of this field is currently under review, see [issue #31](https://github.com/opensets/domainprofiles/issues/31).)*

An array of domains for third party credentials accepted for login.

## sessions.manage.url

The URL of a page to view and revoke logged-in sessions.

## api.key.retrieve.url

The URL of a page to retrieve API key(s).

## report.breach.url

The URL of a page to report security breaches to.

## https

A string containing space-separated tokens (usually only one) describing the site's HTTPS support. Known values:

- enforced: The site upgrades all HTTP requests to HTTPS.
- optional: The site responds to HTTPS requests, but doesn't upgrade HTTP requests.
- unsupported: The site does not respond to HTTPS requests.
- only: The site *only* responds to HTTPS requests (and does not respond to HTTP requests).
- downgraded: The site actually *downgrades* HTTPS connections to HTTP.
- partial: Some parts / subdomains of the site support HTTPS, while others do not. (May be explained further in notes.)

These values describe issues with a site's use of HTTPS and usually follow "optional":

- selfsigned: The site uses a self-signed certificate.
- mismatch: The site uses an HTTPS certificate that does not match the domain it uses it on.
- blockedhttp: The site hotlinks blocked assets (CSS, JS, iframes) from HTTP sources when serving HTTPS.

For more detail about a site's support for HTTPS, see the [HTTPS Everywhere Atlas](https://www.eff.org/https-everywhere/atlas/).

## totp

A string describing a site's support of Time-based One Time Password (RFC 6238), as used by Google Authenticator, for two-factor authentication security. (Rare.)

## questions

List of security questions. Each item that is a string should be interpreted as a required question: each item that is an object may have "required" or "optional" fields with the number of questions that may or must have answers given, and an "options" list of options that may be chosen.

## profile.fields

List of fields included in profiles on that site. (Currently not widely used.)

## notes, \*.notes

Notes on quirks of the site that make it difficult to map to the standard format (usually a URL scheme that doesn't permit easy linking).

Note that nearly any object may have a "notes" field alongside its other documented fields.

## redflags

List of quirks that demonstrate a lack of understanding on the behalf of the site's security construction, sort of like @Defuse's [Password Policy Hall of Shame](https://defuse.ca/password-policy-hall-of-shame.htm). Examples of things that merit red flags:

- Cookies that suggest session isn't stored on the server
- Partial page renders that may expose information to outside observers

Note that factors documented in other fields that should raise red flags, such as restricted password lengths or character sets, are not included in this list.

## platform

*(The structure of this field is currently under review, see [issue #5](https://github.com/opensets/domainprofiles/issues/5).)*

A service or software package the site is based on, as a token-esque name. May be used in the future to provide defaults based on known characteristics and patterns of various platforms (similar to "use").

## use

An alternate domain used as the account provider (for instance, Google services use google.com). Unless a field is specified here (for instance, https), values should be inherited from the specified domain, and records to do with account providers should be fetched according to the used domain.

## reviewed.date

The date and time that the profiled data was last reviewed for accuracy.
