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

### password.reset

The "reset password" page for that site.

#### url

URL of the page.

#### accept

A space-separated token string of what identifiers the site needs to reset passwords. (Usually some combination od "email" and/or "username".)

When sites *require multiple* identifiers, they are joined with a plus (`+`).

### password.change

The "change password" page for users on that site.

#### url

URL of the page.

### password.rules

Rules and requirements the site imposes on passwords.

#### blacklist

Blacklisted characters (usually just ' ' (space); other blacklists are usually non-specific and listed under "mustnot").

#### length

The `min` and `max` lengths permitted for passwords.

#### must

Other restrictions on what passwords *must* do (usually "contain" some class of character).

#### mustnot

Other restrictions on what passwords *must not* do (usually "contain" some class of character).

### username

#### length

The `min` and `max` lengths permitted for usernames.

#### remind

The page to send a username reminder to an email address (when separate from password resetting).

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
