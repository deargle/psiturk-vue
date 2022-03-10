<template lang="html">
  <div class="">

    <div id="container-instructions">

        <h1>Instructions</h1>

        <hr />

        <div class="instructions well">

            <p>
                This is the second page of instructions
            </p>

            <p>
                Put some text in this paragraph
            </p>

        </div>

        <hr />

        <div class="instructionsnav">
            <div class="row">
                <div class="col-xs-2">
                    <button @click="$emit('goto', 'Instruct1')" type="button" id="prev" value="prev" class="btn btn-primary btn-lg previous">
                    <span class="glyphicon glyphicon-arrow-left"></span> Previous
                    </button>
                </div>
                <div class="col-xs-8">
                </div>
                <div class="col-xs-2">
                    <button @click="$emit('goto', 'Instruct3')" type="button" id="next" value="next" class="btn btn-primary btn-lg continue">
                    Next <span class="glyphicon glyphicon-arrow-right"></span>
                    </button>
                </div>
            </div>
        </div>

    </div>

  </div>
</template>

<script>
export default {

}
</script>

<style lang="css" scoped>
</style>
