# Fields used in domain profiles

## name

The name of the site at this domain, as it would be used in a sentence.

## password.value, password.contents

Rules and requirements the site imposes on passwords. Fields under
`password.contents` pertain to individual characters and substrings of the
password; fields under `password.value` apply only for the string value of the
*entire* password.

## password.value.length.min, password.value.length.max

The minimum and maximum length permitted for passwords, respectively.

`min` should only be missing if the site legitimately allows blank passwords (or allows passwords to be disabled): otherwise, `min` will be at least 1. `max` should only be missing if the site will allow passwords over 9000 characters in length. (This can usually be tested by inspecting the password element, then entering `$0.value='Aa'+new Array(9001).join('A')` before submitting.)

## password.contents.blacklist.classes

Array of character types passwords may not contain (such as those from rules that begin "must not contain", or those which trigger errors in the site's password handling).

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
- nonprinting (unprintable characters)

## password.contents.blacklist.strings

Specific characters and sequences which passwords may not contain.

## password.value.blacklist.dictionaries, password.contents.blacklist.dictionaries

Array of keywords describing sets of a words that a password may not match or contain, respectively:

- `english`: English words.
- `profanity`: Profane words (probably English ones).
- `common`: Common passwords like "abc123" or "qweasd".

## password.value.blacklist.variables, password.contents.blacklist.variables

Array of keywords describing other fields of the user's profile that a password may not match or contain, respectively:

- `username`
- `firstname`
- `lastname`

## password.value.blacklist.previous, password.contents.blacklist.previous

Number of retained, previously-used passwords that a password may not match or contain, respectively. When the number is not known, this field's value will just be `yes`.

(`password.contents.blacklist.previous` implies that a site is retaining the plaintext of the user's passwords, and is a *huge* red flag compared to `password.value.blacklist.previous`, which only implies that previous *hashes* are retained.)

## password.contents.whitelist

An object describing the *only* contents permitted in passwords: any content not described by this object is forbidden.

## password.contents.whitelist.classes

Array of character types that are the *only* types supported. See `password.contents.blacklist.classes`.

## password.contents.whitelist.strings

Array of characters not included in `password.contents.whitelist.classes` that are also allowed in passwords.

## password.contents.required

An array of objects, similar to `password.contents.whitelist`, describing characters and classes that *must* be included in the password.

Objects in this array may also have an `atleast` property, indicating that only a certain number of the classes / strings on the object need to be present.

## password.value.must

Array of restrictions on what passwords *must* do (other than those described by `password.contents.required`).

## password.value.mustnot

Array of restrictions on what passwords *must not* do (other than those described by a `blacklist` or `whitelist` object).

## password.reset.url

The URL of the site's "reset password" page.

## password.reset.flow.request.accepts, password.reset.randomize.request.accepts, password.reset.onetime.request.accepts

A space-separated token string of what identifiers the site needs to request an email to enter password reset flow. (Usually some combination of "email" and/or "username".)

When sites *require multiple* identifiers, they are joined with a plus (`+`).

## password.reset.flow.request.captcha, password.reset.randomize.request.captcha, password.reset.onetime.request.captcha

What kind of captcha (if any) is used to deter automated password resets ("yes" if unknown).

Known captchas:

- recaptcha (http://www.google.com/recaptcha)
- botdetect (see http://captcha.com/captcha-examples.html) - when possible, the specific style in use is listed instead:
  - botdetect-vertigo

## password.reset.flow.response.email.sender, password.reset.randomize.response.email.sender, password.reset.onetime.response.email.sender

What email address the password reset response comes from.

## password.reset.flow.response.email.body, password.reset.randomize.response.email.body, password.reset.onetime.response.email.body

A space-separated token string of data the reset mechanism responds with (usually via email):

- username: Your username on the site.
- firstname: A "first name" set on your profile.
- lastname: A "last name" set on your profile.
- url: a URL (possibly linked) to the page to reset the password.
- link: A link (without the URL visible) to reset the password.
- token: A token that can be typed on a page (may also be part of a link/URL) to bring you to the reset screen.
- password: The random password, for "password.reset.randomize" and "password.reset.onetime" methods.
- origin: Data identifying the source for the reset request, such as the IP address it was posted from.

## password.reset.flow.open.expects

Space-separated string of things the password reset page expects before resetting the password. Tokens:

- "origin" (IP address requesting the page must be the same IP the email was requested from)

## password.reset.flow.response.expire, password.reset.onetime.response.expire

How long after issuance the reset token is valid for, as a human-abbreviated string ("24h" is common).

## password.reset.flow.open.expire

How long after beginning the post-response step (ie. following the link) the reset token is valid for, as a human-abbreviated string ("24h" is common).

If the token may not be used to re-open the password reset flow after the first time it is used, this value will be `"now"`.

## password.reset.flow.submit.expire

If the token does not immediately expire until it is used, the value of this field will be `"now"`.

This value is only included as a way of canonically stating that the token does not expire at an earlier step: if it is omitted and there is no `password.reset.flow.open.expire: now`, this means that the step that triggers expiration has not been profiled, not that it is absent. A token that *does not expire* after use would be a red flag, and would be documented as such under `redflags`.

## password.reset.randomize.open.result

Whether following a link sets and sends the randomized password (`send`), or just changes the password to the already-sent password (`change`).

## password.reset.usability.password

A space-separated token string describing how the password set UI differs from double-blind-entry. See `password.change.usability.password`.

## password.reset.flow.submit.destination.page

What kind of page the user is directed to after submitting a reset password:

- `stub`: A page that doesn't go anywhere, you're just expected to close the tab or navbar away or whatever.
- `login`: The login page.
- `settings`: The user settings page, presumably the one with password changes.
- `profile`: The public-facing profile page for the user.
- `home`: Some manner of home page for the user (if `password.reset.flow.submit.sessions.own` is `login`) or the site's root (if it's not `login`).

This assumes the user wasn't logged in before resetting their password. It's possible that a site may have a different destination when a logged-in user resets their password (particularly if `password.reset.flow.submit.sessions.own` is `unchanged` and the destination page when logged out is `login`). If this is the case, this detail may be noted in the pull request comments for the profile change, but this is a detail that is not currently incorporated into profiles.

## password.reset.flow.submit.sessions.own, password.reset.randomize.open.sessions.own

Whether the current session is logged in (`login`), logged out if logged in (`logout`), or not changed with regards to login state (`unchanged`) after resetting.

Note that being *redirected to the login page to enter the new password* does not count as a `login` value here (unless the site for some reason logs the user in *before presenting the login page*, which would make no sense) - such behavior is instead reflected with `password.reset.flow.submit.destination.page` having a value of `login`.

## password.reset.flow.submit.sessions.others, password.reset.randomize.open.sessions.others

Whether other logged-in sessions are invalidated (`logout`) or not (`unchanged`) when resetting a password.

## password.change.url

The URL of the "change password" page for the logged-in user. If the site doesn't have a URL for the logged-in user, this will be in a space-and-plus-separated string denoting where to insert the variable components (such as "username").

## password.change.reauth

"no" if users can change password without reauthenticating, "password" if they have to enter the old password.

## password.change.sessions.own

Whether the current session is logged out (`logout`) or not (`unchanged`) after changing the password.

## password.change.sessions.others

Whether other logged-in sessions are logged out (`logout`) or not (`unchanged`) after changing the password.

## password.change.usability.password

A space-separated token string describing how the password set UI differs from double-blind-entry.

Tokens:

- "single": Does not require password to be entered twice.
- "showable": Password can be toggled to plaintext.

## username.value.\*, username.contents.\*

Rules on the format of usernames. See `password.value` and `password.contents` above.

## username.reminder.url

The URL of the page to send a username reminder to an email address (when separate from password resetting).

## username.reminder.request.accepts

A space-separated token string of what identifiers the site needs to send a username reminder. (Usually just "email".)

When sites *require multiple* identifiers, they are joined with a plus (`+`). (For example, simple.com requires an email *and* phone number, so its `username.remind.accept` value is "email+phone".)

## username.reminder.request.captcha

What kind of captcha (if any) is used to deter automated username reminders. See `password.reset.request.captcha`.

## username.change.url

The URL of the "change username" page for the logged-in user. If the site doesn't have a URL for the logged-in user, this will be in a space-and-plus-separated string denoting where to insert the variable components (such as "userid").

## username.change.reauth

"no" if users can change username without reauthenticating, "password" if they have to (re)enter their password (among other credentials).

## registration.url

The URL of the page to create a new user account.

## registration.captcha

What kind of captcha (if any) is used to deter automated user registration. See `password.reset.captcha`.

## registration.usability.email

A space-separated token string describing how email address is specified in registration.

Tokens:

- "single": requires email address to be entered once.
- "double": requires email address to be entered twice.

## registration.usability.password

A space-separated token string describing how the password set UI differs from double-blind-entry. See `password.change.usability.password`.

## login.url

The URL of the page to log in, as a user.

## login.persist.checked

If there is a checkbox to remain logged in, what the default status of that check box is.

## login.usability.password

A space-separated token string describing how the password UI differs from traditional blind-entry.

Tokens:

- "showable": Password can be toggled to plaintext.

## thirdparty.auth.providers

An array of domains for third party auth providers.

## sessions.management.url

The URL of a page to view and revoke logged-in sessions.

## api.key.retrieval.url

The URL of a page to retrieve API key(s).

## report.breach.url

The URL of a page to report security breaches to.

## totp

A string describing a site's support of Time-based One Time Password (RFC 6238), as used by Google Authenticator, for two-factor authentication security. (Rare.)

## questions

List of security questions. Each item that is a string should be interpreted as a required question: each item that is an object may have "required" or "optional" fields with the number of questions that may or must have answers given, and an "options" list of options that may be chosen.

## notes, \*.notes

Notes on quirks of the site that make it difficult to map to the standard format (usually a URL scheme that doesn't permit easy linking).

Note that nearly any object may have a "notes" field alongside its other documented fields.

## redflags

List of quirks that demonstrate a lack of understanding on the behalf of the site's security construction, sort of like @Defuse's [Password Policy Hall of Shame](https://defuse.ca/password-policy-hall-of-shame.htm). Examples of things that merit red flags:

- Cookies that suggest session isn't stored on the server
- Partial page renders that may expose information to outside observers
- Logging the user out when changing their password, but leaving their other sessions logged in (see password.change.sessions.invalidate)

Note that factors documented in other fields that should raise red flags, such as restricted password lengths or character sets, are not included in this list.

## use

An alternate domain used as the account provider (for instance, Google services use google.com). Unless a field is specified here (for instance, https), values should be inherited from the specified domain, and records to do with account providers should be fetched according to the used domain.

## distinguish.subdomains.level

For sites that keep multiple subsites with separate account databases under subdomains, this will be a number describing what level of subdomain (from the root) should be seen as a distinct site using this profile. For instance, the profile for `slack.com` has a value fo `3`, as the third-level domain is where sites are distinguished (an account on `foo.slack.com` not being shared with `bar.slack.com`).

Note that profiles for sites with distinct subdomains will use a `*` in URLs to represent the domain component that varies from subsite to subsite, like `https://auth.*.example.com/login`.

## reviewed.date

The date and time that the profiled data was last reviewed for accuracy.
