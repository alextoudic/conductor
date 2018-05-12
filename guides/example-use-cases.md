# example use cases

## decoding JWTs

```javascript
const decodeToken = (req) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new OAuth2Error('Missing Authorization header', 401, AUTHORIZATION_MISSING_ACCESS_TOKEN);
  }
  // Strip Bearer part
  const token = authorization.split(' ')[1];
  if (!token) {
    throw new OAuth2Error('Missing access token', 401, AUTHORIZATION_MISSING_ACCESS_TOKEN);
  }
  // base64 decode
  const decoded = jwt.decode(token);
  // Check that the token contains a sub claim i.e an userId
  if (!decoded || !decoded.sub) {
    throw new OAuth2Error('Invalid access token', 401, AUTHORIZATION_INVALID_ACCESS_TOKEN);
  }
  return decoded;
};
```

```javascript
const throwMissingHeader = () => {
  throw new OAuth2Error('Missing Authorization header', 401, AUTHORIZATION_MISSING_ACCESS_TOKEN)
}
const stripBearer = compose(get(1), split(' '))
const throwMissingJwt = () => {
  throw new OAuth2Error('Missing access token', 401, AUTHORIZATION_MISSING_ACCESS_TOKEN
}
const throwInvalidJwt = () => {
  throw new OAuth2Error('Invalid access token', 401, AUTHORIZATION_INVALID_ACCESS_TOKEN);
}
const hasASubClaim = and(identity, has('sub'))

const decodeToken = compose(
  ifElse(compose(not, hasASubClaim), throwInvalidJwt),
  jwt.decode,
  ifElse(not, throwMissingJwt),
  stripBearer,
  get('authorization'),
  ifElse(compose(not, has('authorization')), throwMissingHeader),
  get('headers')
)
```
