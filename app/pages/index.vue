<script setup lang="ts">

</script>

<template>
  <section>
    <div class="intro">
      <p class="first">Design Your Future</p>
      <p class="second bold">Find Top Universities With <span class="main-color bold">YourFP</span></p>

      <NuxtLink to="/universities"><button>Get Started</button></NuxtLink>
    </div>

    <div class="blocks">
      <article>
        <img src="~/assets/img/home1.png" alt="Careers">
        <p class="title">Explore Careers</p>
        <p class="text">Browse popular design professions such as Graphic, Web, and UX/UI Design.</p>
      </article>

      <article>
        <img src="~/assets/img/home2.png" alt="Listings">
        <p class="title">University Listings</p>
        <p class="text">Compare universities by ranking, tuition, and location.</p>
      </article>

      <article>
        <img src="~/assets/img/home3.png" alt="Students">
        <p class="title">Meet University Students</p>
        <p class="text">Bookmark universities and access your shortlist anytime.</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.intro p {
  letter-spacing: -1px;
}

.intro .second {
  font-size: 36px;
  color: #666;
}

.blocks {
  margin: calc(2 * var(--main-distance)) var(--main-distance);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
}

article {
  display: grid;
  height: min-content;
}

article img {
  margin-bottom: var(--main-distance);
}

article img,
article .text {
  width: 300px;
}

article .title {
  font-size: 20px;
  font-weight: 700;
}

article .text {
  color: #555;
}

@media screen and (max-width: 1024px) {
  .blocks {
    grid-template-columns: unset;
  }

  article img,
  article .text {
    width: 500px;
  }
}

@media screen and (max-width: 768px) {
  .intro .second {
    font-size: 32px;
  }

  article img,
  article .text {
    width: 100%;
  }
}
</style>
