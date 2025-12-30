<script setup lang="ts">

</script>

<template>
  <section>
    <div class="intro">
      <p class="first">What Is Our Goal?</p>
      <p class="second">Welcome to <span class="main-color bold">Your Future Path</span> - a platform designed to connect high school students with current university students, professionals, and global educational opportunities.</p>
    </div>

    <div class="blocks">
      <article>
        <p>
          <span class="bold">Who We Are</span><br>
          At Your Future Path, we are a passionate team dedicated to helping students unlock their full potential. We understand how overwhelming it can be to choose a career or university, and we're here to make that journey easier, smarter, and more meaningful.
        </p>

        <img src="~/assets/img/about1.png" alt="About Us">
      </article>

      <article class="second">
        <img src="~/assets/img/about2.png" alt="About Us">

        <p>
          <span class="bold">What We Do</span><br>
          We offer personalized guidance to help students explore different professions, understand university options, and make informed decisions based on their interests, skills, and goals. Using advanced technology and expert support, we create tools that test, match, and recommend the best academic paths for each student.
        </p>
      </article>

      <article>
        <p>
          <span class="bold">Why It Matters</span><br>
          Every year, millions of students struggle with confusion, dropout rates, and regret due to uninformed choices. We aim to change that. By giving students clarity and direction early on, we empower them to make confident decisions and build successful, fulfilling futures.
        </p>

        <img src="~/assets/img/about3.png" alt="About Us">
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
