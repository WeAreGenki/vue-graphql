/**
 * vue-graphql
 * Vue plugin for easy GraphQL requests
 *
 * @author: Max Milton <max@wearegenki.com>
 *
 * Copyright 2017 We Are Genki
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { GraphQLClient } from 'graphql-request';

// Vue plugin install hook
function install(Vue) {
  // inject plugin into Vue instances as $graphql
  function inject() {
    const options = this.$options;
    if (options.graphql) {
      this.$graphql = options.graphql;
    } else if (options.parent && options.parent.$graphql) {
      this.$graphql = options.parent.$graphql;
    }
  }
  const usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1;
  Vue.mixin(usesInit ? { init: inject } : { beforeCreate: inject });
}

class Client extends GraphQLClient {};

export default {
  install,
  Client,
};
