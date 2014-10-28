# domainprofiles

Profiles of the security support and user account systems of various sites.

## Where you would use this

On sites or in browser extensions that deal with user accounts across sites. For instance, this was originally curated as a component of [blot.pw](http://blot.pw).

## Further info

Information on the subject of deleting accounts on sites can be found at accountkiller.com and justdelete.me (and the [sites.json](https://github.com/rmlewisuk/justdelete.me/blob/master/sites.json) it uses).

## Layout

Entries for domains are in [YAML](http://yaml.org/) files in the "profiles" directory, in sub-directories based on their [public suffix](http://publicsuffix.org/). The filename of each file, minus the .yaml extension, is the remaining domain component(s).

Domains are listed by the least-specific component of the domain necessary to distinguish it from others: therefore, most sites are listed simply by the second-level domain (regardless of whether or not they use a further domain like www).

When lower-level domains have their own profiles (such as Arch Linux's AUR and BBS), their filenames include the lower domain components, like org/aur.archlinux.yaml and org/bbs.archlinux.yaml.

## Notes on URLs

Where fields include a link, if the site supports HTTPS optionally, the link provided will be HTTPS.

For pages that contain several sections, only one of which is pertinent to the link, the link will include an anchor / fragment for the relevant section (where possible).

When URLs include a variable (such as a username), the URL will be separated by spaces and plusses (for concatenation).

## Fields

### name

The name of the site at this domain, as it would be used in a sentence.

### password.rules

Rules and requirements the site imposes on passwords.

#### length

An object with the `min` and `max` lengths permitted for passwords.

#### blacklist

Array of character types not allowed (such as those from rules that begin "must not contain").

#### whitelist

Array of character types that are the *only* types supported.

#### contain

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
- dot (".")
- hyphen ("-")
- underscore ("_")
- at ("@")

#### classes

Array of advanced class satisfaction rules: contains objects with `required`, as the number of classes required, and `from`, as an array of `contain` class names that can be included.

Currently, this is only used for linode.com.

#### must

Array of other restrictions on what passwords *must* do (if not coverable by `contain` or `classes`).

#### mustnot

Array of other restrictions on what passwords *must not* do.

### password.reset

The "reset password" page for that site.

#### url

URL of the page.

#### accept

A space-separated token string of what identifiers the site needs to reset passwords. (Usually some combination of "email" and/or "username".)

When sites *require multiple* identifiers, they are joined with a plus (`+`).

#### captcha

What kind of captcha (if any) is used to deter automated password resets ("yes" if unknown).

Known captchas:

- recaptcha (http://www.google.com/recaptcha)
- botdetect (see http://captcha.com/captcha-examples.html) - when possible, the specific style in use is listed instead:
  - botdetect-vertigo

#### response

A space-separated token string of data the reset mechanism responds with (usually via email):

- username: Your username on the site.
- url: a URL (possibly linked) to the page to reset the password.
- link: A link (without the URL visible) to reset the password.
- token: A token that can be typed on a page (may also be part of a link/URL) to bring you to the reset screen.

#### token.expires

How long after issuance the reset token is valid for, as a human-abbreviated string ("24h" is common).

#### token.login

Whether the reset token works as login credentials. Valid values:

- "before" (the token logs you in before resetting the password)
- "after" (the token logs you in after resetting the password)
- "no" (the token does not log you in)

### password.change

The "change password" page for users on that site.

#### url

URL of the page.

#### reauth

"no" if you can change password without reauthenticating, "password" if you have to enter the old password.

#### usability

A space-separated token string describing how the password set UI differs from double-blind-entry.

Tokens:

- "single": Does not require password to be entered twice.
- "showable": Password can be toggled to plaintext.

### username

#### rules

Rules on the format of usernames. See `password.rules`.

#### remind.url

The URL of the page to send a username reminder to an email address (when separate from password resetting).

### register.url

The URL of the page to create a new user account.

### login.url

The URL of the page to log in, as a user.

### sessions.manage.url

The URL of a page to view and revoke logged-in sessions.

### https

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

### totp

A string describing a site's support of Time-based One Time Password (RFC 6238), as used by Google Authenticator, for two-factor authentication security. (Rare.)

### questions

List of security questions. Each item that is a string should be interpreted as a required question: each item that is an object may have "required" or "optional" fields with the number of questions that may or must have answers given, and an "options" list of options that may be chosen.

### profile

List of fields included in profiles on that site. (Currently not widely used.)

### notes

Notes on quirks of the site that make it difficult to map to the standard format (usually a URL scheme that doesn't permit easy linking).

### redflags

List of quirks that demonstrate a lack of understanding on the behalf of the site's security construction, sort of like @Defuse's [Password Policy Hall of Shame](https://defuse.ca/password-policy-hall-of-shame.htm). Examples of things that merit red flags:

- Cookies that suggest session isn't stored on the server
- Partial page renders that may expose information to outside observers

Note that factors documented in other fields that should raise red flags, such as restricted password lengths or character sets, are not included in this list.

### platform

A service or software package the site is based on, as a token-esque name. May be used in the future to provide defaults based on known characteristics and patterns of various platforms (similar to "use").

### use

An alternate domain used as the account provider (for instance, Google services use google.com). Unless a field is specified here (for instance, https), values should be inherited from the specified domain, and records to do with account providers should be fetched according to the used domain.
