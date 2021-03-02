const app = new Vue({
    el: "#app",
    data: {
        beers: [],
        newBeer: {}
    },
    methods: {
        add: function ()
        {
            this.ajax('/beer/add', this.newBeer).then(function() {
                this.beers.push(this.newBeer)
                this.initForm()
            })

        },
        initForm: function() {
            this.newBeer = {
                name: '',
                color: '',
                hex: '#FF0000',
                country: '',
                note: 0,
                degree: 0,
                descr: ''
            }
        },
        ajax: function(url, params = { } ) {
            let s = url+"?";
            for(let key in params) {
                s += key + "=" + encodeURIComponent(params[key]) +"&"
            }
            return this.$http.get(s);
        }
    },
    computed: {},
    mounted: function ()
    {
        this.$http.get('/beer/list').then(function (response)
        {
            this.beers = response.data
        })

        this.initForm()
    }
})
