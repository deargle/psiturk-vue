import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// https://www.freecodecamp.org/news/javascript-debounce-example/
function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

function beforeWindowUnload (e) {
  if(!store.state.debug) {
    e.preventDefault()
    store.dispatch('markQuitter')
    let message = "By leaving or reloading this page, you opt out of the experiment. Are you sure you want to leave the experiment?"
    e.returnValue = message
    return message
  }
}

const store = new Vuex.Store({
  state: {
    uniqueId: null,
    id: null,

    trialData: [],
    unstructuredData: {},

    condition: null,
    counterbalance: 0,
    assignmentId: null,
    workerId: null,
    hitId: null,
    currenttrial: 0,
    bonus: 0,
    data: [],
    questiondata: [],
    eventdata: [],
    useragent: "",
    mode: null,
  },
  mutations: {
    setParticipant( state, payload ) {
      state.uniqueId = payload.uniqueId
      state.mode = payload.mode
      state.condition = payload.condition
    },

    recordTrialData( state, trialdata ) {
      trialdata = {
        "uniqueid": state.uniqueId,
        "current_trial": state.currenttrial,
        "dateTime": (new Date().getTime()),
        "trialdata": trialdata
      };

      state.data.push(trialdata)
      state.currenttrial += 1;
    },

    recordUnstructuredData( state, payload ) {
      state.questiondata[payload.field] = payload.value
    },

    setUserAgent( state, userAgent ) {
      state.useragent = userAgent
    },

    addEvent(state, payload) {
      let eventtype = payload.eventtype
      let value = payload.value

      let interval;
      let timestamp = new Date().getTime()

      if (eventtype == 'initialized') {
        interval = 0;
      } else {
        let ed = state.eventdata
        interval = timestamp - ed[ed.length-1]['timestamp'];
      }

      state.eventdata.push({'eventtype': eventtype, 'value': value, 'timestamp': timestamp, 'interval': interval});
    },

  },

  actions: {

    startTask({ dispatch }) {
      if (process.env.NODE_ENV == 'production') {
        dispatch('saveData')
        dispatch('markInExp')
        window.addEventListener('beforeunload', beforeWindowUnload)
      }
    },

    completeHIT({ dispatch, state }) {
      if (process.env.NODE_ENV == 'production') {
        window.removeEventListener('beforeunload', beforeWindowUnload)

        dispatch('saveData')
          .then( () => fetch('/worker_complete?' + new URLSearchParams({ 'uniqueId': state.uniqueId })) )
          .then(response => response.json())
          .then(data => console.log(data))
          .then(() => window.location.href = `/complete?uniqueId=${state.uniqueId}&mode=${state.mode}`)

      }
    },

    initialize({ commit }) {
      commit('setUserAgent', navigator.userAgent)
      // this.set({ mode: this.mode });
      commit('addEvent', { eventtype: 'initialized', value: null })
      commit('addEvent', { eventtype: 'window_resize', value: [window.innerWidth, window.innerHeight] })

      window.addEventListener('blur',  () => commit('addEvent', { eventtype: 'focus', value: 'off' }))
      window.addEventListener('focus', () => commit('addEvent', { eventtype: 'focus', value: 'on' }))

      window.addEventListener('resize', debounce(() => {
        commit('addEvent', { eventtype: 'window_resize', value: [window.innerWidth, window.innerHeight] })
      }), 200)
    },

    saveData(context) { // eslint-disable-line no-unused-vars
      // sync (save) data (vuex store) to psiturk server (`/sync/id` route)
      if (process.env.NODE_ENV == 'production') {
        return fetch(`/sync/${context.state.uniqueId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(context.state)
          })
            .then(response => response.json())
            .then(data => console.log(data))
      }
    },

    markQuitter({ state }) { // eslint-disable-line no-unused-vars
      if (process.env.NODE_ENV == 'production') {
        let data = new FormData()
        data.append('uniqueId', state.uniqueId )
        return fetch('/quitter', {
          method: 'POST',
          // headers: {
          //   'Content-Type': 'application/json'
          // },
          body: data
        })
      }
    },

    markInExp(context) { // eslint-disable-line no-unused-vars
      if (process.env.NODE_ENV == 'production') {
        return fetch('/inexp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ uniqueId: context.state.uniqueId })
        })
      }
    },

    preloadImages(context, imagenames) {
      // loads each image, so that the browser caches it.
      return Promise.all(
          imagenames.map(imagename => {
          return new Promise( resolve => {
            let image = new Image()
            image.addEventListener('load', () => {
              resolve(image)
            })
            image.src = imagename
          })
        })
      )
    },
  },
  modules: {

  }
})

store.dispatch('initialize')

export default store
