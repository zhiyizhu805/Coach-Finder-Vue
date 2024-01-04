<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <span class="filter-option">
      <input type="checkbox" id="frontend" checked @change="setFilter"/>
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="backend" checked @change="setFilter"/>
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="career" checked @change="setFilter"/>
      <label for="career">Career</label>
    </span>
  </base-card>
</template>


<script>
export default {
    data(){
        return {
            filters: {
                frontend: true,
                backend: true,
                career: true,
            }
        }
    },
    methods:{
        setFilter(event){
          const inputID = event.target.id
          const isActive = event.target.checked
          const updatedFilters = { 
            ...this.filters,
            [inputID]: isActive
          } 
          this.filters  = updatedFilters
          this.$emit('change-filter', updatedFilters)

        }
    }
}
</script>