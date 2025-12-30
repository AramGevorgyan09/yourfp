<script setup lang="ts">
interface FAQ {
  question: string
  answer: string
}

const faqs = ref<FAQ[]>([
  {
    question: 'How to register as a guide?',
    answer: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas quidem perspiciatis non cum libero quo deleniti accusantium autem adipisci quasi.'
  },
  {
    question: 'How to make my profile visible for others?',
    answer: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas quidem perspiciatis non cum libero quo deleniti accusantium autem adipisci quasi.'
  },
  {
    question: 'How to register as a guide?',
    answer: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas quidem perspiciatis non cum libero quo deleniti accusantium autem adipisci quasi.'
  },
  {
    question: 'How to make my profile visible for others?',
    answer: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas quidem perspiciatis non cum libero quo deleniti accusantium autem adipisci quasi.'
  },
  {
    question: 'How to register as a guide?',
    answer: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas quidem perspiciatis non cum libero quo deleniti accusantium autem adipisci quasi.'
  },
  {
    question: 'How to make my profile visible for others?',
    answer: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas quidem perspiciatis non cum libero quo deleniti accusantium autem adipisci quasi.'
  }
])

onMounted(() => {
  for (let i = 0; i < faqs.value.length; i++) {
    const answerTag = document.querySelector(`.faq #faq${i} .answer`)
    const faq = faqs.value[i]
    
    if (answerTag && faq)
      answerTag.innerHTML = faq.answer
  }
})

const toggleQuestion = (index: number) => {
  document.querySelector(`#faq${index}`)?.classList.toggle('show')
}
</script>

<template>
  <footer>
    <p class="medium-title">FAQ</p>

    <section class="faq">
      <div v-for="(faq, index) in faqs" :id="`faq${index}`" :key="index" class="block pointer" @click="toggleQuestion(index)">
        <div class="question">
          <Icon name="mdi:plus" size="24px" style="color: #000;" class="open" /> {{ faq.question }}
        </div>

        <div class="answer" />
      </div>
    </section>

    <section class="main">
      <div class="logo">
        <img src="/logo.png" alt="YourFP Logo">
      </div>

      <div class="block">
        <p class="title bold">Contact Us</p>

        <div class="contacts">
          <a href="tel:+37494488349" class="item-with-icon hover-opacity"><Icon name="mdi:phone" size="20px" style="color: #000;" /> +374 94 488349</a>
          <a href="tel:+37444412283" class="item-with-icon hover-opacity"><Icon name="mdi:phone" size="20px" style="color: #000;" /> +374 44 412283</a>
          <a href="mailto:help@yourfp.net" class="item-with-icon hover-opacity"><Icon name="mdi:email" size="20px" style="color: #000;" /> help@yourfp.net</a>
        </div>
      </div>

      <div class="block">
        <p class="title bold">Policies</p>

        <div class="policies">
          <NuxtLink to="/privacy-policy" class="hover-opacity">Privacy Policy</NuxtLink>
          <NuxtLink to="/terms-and-conditions" class="hover-opacity">Terms and Conditions</NuxtLink>
        </div>
      </div>

      <div class="block">
        <p class="title bold">Follow Us</p>

        <div class="social-media">
          <a href="https://www.instagram.com/" target="_blank">
            <Icon name="mdi:instagram" size="36px" class="icon" />
          </a>
          <a href="https://web.telegram.org/" target="_blank">
            <Icon name="mdi:telegram" size="36px" class="icon" />
          </a>
          <a href="https://www.facebook.com/" target="_blank">
            <Icon name="mdi:facebook" size="36px" class="icon" />
          </a>
          <a href="https://www.youtube.com/" target="_blank">
            <Icon name="mdi:youtube" size="36px" class="icon" />
          </a>
        </div>
      </div>
    </section>

    <section class="end center">&#169; 2025 YourFP. All Rights Reserved. | Demo Version</section>
  </footer>
</template>

<style scoped>
footer {
  width: 1440px;
  min-width: 320px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  background-color: #eee;
  display: grid;
  gap: var(--main-distance);
  padding: var(--main-distance);
  border-radius: 30px 30px 0 0;
}

.faq {
  display: grid;
  gap: 10px;
}

.faq .block {
  position: relative;
  background-color: #fff;
  padding: calc(var(--main-distance) / 2);
  border: 2px solid transparent;
  border-radius: 15px;
  transition: 0.4s;
}

.faq .block:hover {
  border-color: #000;
}

.faq .block.show .open {
  transform: rotate(45deg);
}

.faq .block .question {
  display: flex;
  gap: calc(var(--main-distance) / 2);
  align-items: center;
}

.faq .block .answer {
  margin-left: calc(24px + var(--main-distance) / 2);
  line-height: 0%;
  opacity: 0;
}

.faq .block.show .answer {
  line-height: 100%;
  opacity: 1;
  margin-top: calc(var(--main-distance) / 2);
}

.main {
  display: flex;
  gap: var(--main-distance);
  flex-wrap: wrap;
}

.logo {
  height: 103px;
}

.logo img {
  height: 100%;
}

.main .block {
  display: grid;
  gap: 10px;
  height: min-content;
}

.main .block .title {
  font-size: 20px;
}

.main .block div {
  display: flex;
  gap: 5px;
}

.main .block .contacts,
.main .block .policies {
  display: grid;
  width: fit-content;
}

.main .block .social-media a {
  height: 36px;
}

.main .block .social-media a .icon {
  color: #000;
}

.main .block .social-media a:hover .icon {
  color: var(--main-color);
}

.end {
  color: #666;
}

@media screen and (max-width: 1440px) {
  footer {
    width: unset;
  }
}

@media screen and (max-width: 900px) {
  .logo {
    width: 100%;
    height: 90px;
  }
}

@media screen and (max-width: 768px) {
  .main {
    margin: var(--main-distance) 0;
  }

  .end {
    text-align: left;
  }
}
</style>
