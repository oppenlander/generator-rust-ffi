# <%= name %>
<%= description %>

**Table of Contents**
- [About](#about)
<% for (var key in bindings) { var binding = bindings[key]; %>
- [<%= binding.name %>](#<%= binding.slugname %>)

<% } %>
## About
This is a Rust crate that also contains bootstrapping for creating bindings in other languages.  

## Bindings

<% for (var key in bindings) { var binding = bindings[key]; %>
### <%= binding.name %>
<%= binding.description %>

#### Build
<%= binding.build %>

#### Test
<%= binding.test %>

<% } %>
## License
<%= license %>
