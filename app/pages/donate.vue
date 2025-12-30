<script setup lang="ts">

</script>

<template>
  <section>
    <div class="intro">
      <p class="first">Why To Donate?</p>
      <p class="second"><span class="main-color bold">YourFP</span> is run by a small team. Donate to support development and become a <span class="bold">PRIME MEMBER</span> of our community!</p>
    </div>

    <div class="blocks">
      <article class="bg-red-500 text-white p-4">
        <p>
          <span class="bold">How To Donate</span><br>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores vitae facilis ipsum sunt consequuntur ipsa enim deleniti repudiandae impedit, excepturi non accusamus illo sequi ipsam atque culpa quam odit illum?
        </p>

        <img src="~/assets/img/about1.png" alt="About Us">
      </article>

      <article class="second">
        <img src="~/assets/img/about2.png" alt="About Us">

        <p>
          <span class="bold">Thank You For Your Donation</span><br>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores vitae facilis ipsum sunt consequuntur ipsa enim deleniti repudiandae impedit, excepturi non accusamus illo sequi ipsam atque culpa quam odit illum?
        </p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.intro .second {
  font-size: 18px;
  max-width: 600px;
  margin-top: 10px;
}

.blocks {
  margin: calc(var(--main-distance) * 2) var(--main-distance);
  display: grid;
  justify-items: center;
}

article {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--main-distance);
  align-items: center;
}

article p {
  font-size: 20px;
}

article p span {
  font-size: 24px;
}

article img,
article p {
  width: 400px;
}

@media screen and (max-width: 1024px) {
  article img,
  article p {
    width: 300px;
  }
}

@media screen and (max-width: 768px) {
  article {
    grid-template-columns: unset;
  }

  article img,
  article p {
    width: 100%;
  }

  article p {
    font-size: 16px;
  }

  article p span {
    font-size: 20px;
  }

  article.second img {
    grid-row: 2 / 2;
  }
}
</style>
