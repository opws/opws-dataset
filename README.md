# domainprofiles

Profiles of the security support and user account systems of various sites.

## Where you would use this

On sites or in browser eextensions that deal with user accounts across sites. For instance, this was originally curated as a component of [blot.pw](http://blot.pw).

## Further info

Information on the subject of deleting accounts on sites can be found at accountkiller.com and justdelete.me (and the [sites.json](https://github.com/rmlewisuk/justdelete.me/blob/master/sites.json) it uses).

## Layout

Entries for domains are in [YAML](http://yaml.org/) files in the "yaml" directory, in sub-directories based on their top-level domain. The filename of each file, minus the .yaml extension, is the remaining domain component(s).

Domains are listed by the least-specific component of the domain necessary to distinguish it from others: therefore, most sites are listed simply by the second-level domain (regardless of whether or not they use a further domain like www).

When lower-level domains have their own profiles (such as Arch Linux's AUR and BBS), their filenames include the lower domain components, like org/aur.archlinux.yaml and org/bbs.archlinux.yaml.

## Notes on URLs

Where fields include a link, if the site supports HTTPS optionally, the link provided will be HTTPS.

For pages that contain several sections, only one of which is pertinent to the link, the link will include an anchor / fragment for the relevant section (where possible).

When URLs include a variable (such as a username), the URL will be separated by spaces and plusses (for concatenation).

## Fields

### name

The name of the site at this domain, as it would be used in a sentence.

### password

#### reset

The URL of the "reset password" page for that site.

#### change

The URL of the "change password" page for users on that site.

#### length

The `min` and `max` lengths permitted for passwords.

#### rules

A list of rules and requirements the site imposes on passwords (this includes lengths when the site mentions them in their description of the rules).

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
- downgraded: The site actually *downgrades* HTTPS connections to HTTP (a baffling behavior only seen on behance.net).
- partial: Some parts / subdomains of the site support HTTPS, while others do not. (May be explained further in notes.)

These values describe issues with a site's use of HTTPS and usually follow "optional":

- selfsigned: The site uses a self-signed certificate.
- mismatch: The site uses an HTTPS certificate that does not match the domain it uses it on.
- blockedhttp: The site hotlinks blocked assets (CSS, JS, iframes) from HTTP sources when serving HTTPS.

### totp

A string describing a site's support of Time-based One Time Password (RFC 6238), as used by Google Authenticator, for two-factor authentication security. (Rare.)

### profile

List of fields included in profiles on that site. (Currently not widely used.)

### notes

Notes on quirks of the site that make it difficult to map to the standard format (usually a URL scheme that doesn't permit easy linking).

### redflags

List of quirks that demonstrate a lack of understanding on the behalf of the site's security construction, things like:

- Restricted sets of characters allowed in passwords
- Insecure maximum password lengths
- Cookies that suggest session isn't stored on the server

### use

An alternate domain used as th account provider (for instance, Google services use google.com). Unless a field is specified here (for instance, https), values should be inherited from the specified domain.
