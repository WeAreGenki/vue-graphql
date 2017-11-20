# vue-graphql

> Vue plugin for easy GraphQL requests

For the most part this is just a simple wrapper of [graphql-request](https://github.com/graphcool/graphql-request).

## Usage

### Install

```bash
yarn add vue-graphql
```
or

```bash
npm install vue-graphql
```

### Add to your app

Typical use is to create a `graphql.js` file which installs the plugin. For example if you need an `Authorization` header with every request:

```javascript
import Vue from 'vue';
import VueGraphQL from 'vue-graphql';

Vue.use(VueGraphQL);

const graphqlApi = 'https://your-api-endpoint.com/graphql'
const auth = 'REPLACE_WITH_YOUR_AUTH_TOKEN';

const client = new VueGraphQL.Client(graphqlApi, {
  headers: {
    Authorization: `Bearer ${auth}`,
  }
});

export default client;

```
Then import that file in your vue entrypoint, e.g. `main.js`:

```javascript
import Vue from 'vue';
import graphql from './graphql';
import App from './App';

new Vue({
  el: '#app',
  graphql,
  render: h => h(App),
});
```

### Use in vue components

The plugin will inject itself into the vue instance so you can call it with `this.$graphql` in vue components. A simplified example using async/await:

```javascript
export default {
  data() {
    return {
      list: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      try {
        const res = await this.$graphql.request(`
          {
            myList {
              id
            }
          }
        `);
        this.list = res.myList;
      } catch (err) {
        // do something with the error
      }
    },
  },
};
```

For documentation about additional methods please see the [graphql-request documentation](https://github.com/graphcool/graphql-request/blob/master/README.md).

To learn how to construct a GraphQL query see [the official GraphQL documentation](http://graphql.org/learn/queries/).

-----

© 2017 [We Are Genki](https://wearegenki.com)
