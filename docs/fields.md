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

## password.reset.request.accepts

A space-separated token string of what identifiers the site needs to reset passwords. (Usually some combination of "email" and/or "username".)

When sites *require multiple* identifiers, they are joined with a plus (`+`).

## password.reset.request.captcha

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
- origin: Data identifying the source for the reset request, such as the IP address it was posted from.

## password.reset.expects

Space-separated string of things the password reset page expects before resetting the password. Tokens:

- "origin" (IP address requesting the page must be the same IP the email was requested from)

## password.reset.steps

An array of string tokens describing the operations involved after a user follows whatever password reset link they get via email:

- "change" (for the actual changing of the password)
- "autochange" (for when the password is changed to something else by the site, eg. Neocities)
- "button" (when the next step happens automatically, but only after a POST)
- "expire" (documenting at what point the token is expired)
- "stub" (the page displays a message confirming the reset and you go nowhere)
- "login" (user is directed to the login page)
- "autologin" (user is logged in)

Where "stub" is a non-final step (eg. when it is followed by "login"), it is implied that there is a single button that, when clicked, leads to the next step (similar to "button").

## password.reset.expiration.trigger

Which step causes the reset session token to be invalidated for further reset attempts. Should be "change", is sometimes "visit" (meaning the reset link can only be followed once).

## password.reset.expiration.timeout

How long after issuance the reset token is valid for, as a human-abbreviated string ("24h" is common).

## password.reset.usability.password

A space-separated token string describing how the password set UI differs from double-blind-entry. See `password.change.usability.password`.

## password.reset.token.login

*(This field is deprecated. Profiles should transition to using password.reset.steps instead. See [issue #70](https://github.com/opensets/domainprofiles/issues/70).)*

Whether the reset token works as login credentials. Valid values:

- "before" (the token logs you in before resetting the password)
- "after" (the token logs you in after resetting the password)
- "no" (the token does not log you in)

A value of "before" implies you may opt not to reset the password (using the reset token logs you in and you can navigate away). For sites that use a temporary password as the reset token, a value of "after" implies you are *required* to reset the password after logging in with the temporary password.

## password.reset.sessions.invalidate

Whether resetting your password invalidates sessions (logs you out), forcing you to log back in with the new password.

Values:

- "all": demonstrably invalidates all sessions
- "no": doesn't invalidate any logged-in sessions
  - Although this is less secure than the alternative(s), it's assumed to be the default.

## password.change.url

The URL of the "change password" page for the logged-in user. If the site doesn't have a URL for the logged-in user, this will be in a space-and-plus-separated string denoting where to insert the variable components (such as "username").

## password.change.reauth

"no" if users can change password without reauthenticating, "password" if they have to enter the old password.

## password.change.sessions.invalidate

Whether changing your password invalidates sessions (logs you out), forcing you to log back in with the new password.

Values:

- "own": invalidates session that changed password
  - This hopefully implies that other sessions are invalidated as well (like "all"), but hasn't been verified.
  - If other sessions are still shown to be logged in, it will be listed under redflags.
- "others": invalidates all sessions other than the one used to change the password
- "all": demonstrably invalidates all sessions
- "no": doesn't log you out or invalidate any other logged-in sessions
  - Although this is less secure than the others, it's assumed to be the default.

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

## reviewed.date

The date and time that the profiled data was last reviewed for accuracy.
