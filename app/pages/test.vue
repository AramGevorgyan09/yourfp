<script setup lang="ts">
definePageMeta({ middleware: 'with-account' })

const props = defineProps<{
  getAiAnswer: (array: number[]) => void
}>()

const goBack = () => {
  navigateTo('/universities')
}

const questions = reactive<string[]>([
  'What is your school GPA / IB score / or grading system score? (Please include the grading system used - e.g., 10-point, 20-point, GPA 4.0, IB, etc.)',
  'What is the name of your school?',
  'In which country is your school located?',
  `What is your SAT score? (If you haven't taken it, you can write "not taken.")`,
  'Have you taken TOEFL or IELTS? (If yes, please write your score and the test name. If no, write "not taken." - Optional)',
  'Tell us about your volunteering experience. (Optional - Describe where, how long, and what you did.)',
  'Tell us about your achievements. (Optional - Olympiads, competitions, certificates, etc.)',
  'What are your hobbies? (Optional - Sports, arts, music, chess, reading, coding, etc.)',
  'What field or major are you most interested in studying? (E.g., Computer Science, Law, Engineering, Medicine, Business, etc.)',
  'What country or region do you prefer to study in? (E.g., USA, Canada, Europe, Asia, Anywhere, etc.)',
  'What kind of university environment do you prefer? (Big/small campus, city/rural, highly ranked vs. more supportive, etc.)',
  'What is your total annual university budget (in USD)? (Please give a number or range, e.g., $0-5,000 if you need full financial aid, or $10,000-30,000, etc.)',
  'Do you need full financial aid or are you able to cover some or all costs yourself?',
  'What languages do you speak and at what level?',
  'Have you done any extracurricular activities? (Clubs, sports, music, leadership, etc.)',
])

const questionNumber = ref<number>(0)
const answers = reactive<string[]>([])

const nextQuestion = async () => {
  if (questionNumber.value < questions.length - 1) {
    questionNumber.value++
  } else {
    // await getAnswerFromAI();

    props.getAiAnswer([1, 2, 3])
    navigateTo('/universities')
  }
}
</script>

<template>
  <section>
    <GoBack :go-back="goBack" />

    <aside class="test">
      <p class="question-number">Question {{ questionNumber + 1 }} / {{ questions.length }}</p>
      <p class="medium-title">Test</p>
      <p class="question">{{ questions[questionNumber] }}</p>

      <textarea v-model="answers[questionNumber]" placeholder="Type your answer here" rows="4" />
      
      <div class="buttons">
        <button v-if="questionNumber > 0" class="back" @click="questionNumber--">
          Back
          <Icon name="line-md:arrow-small-left" size="24px" style="color: #fff;" class="icon" />
        </button>

        <button class="next" @click="nextQuestion">
          {{ questionNumber == questions.length - 1 ? 'Finish' : 'Next' }}
          <Icon :name="`${questionNumber == questions.length - 1 ? 'material-symbols:check' : 'line-md:arrow-small-right'}`" size="24px" style="color: #fff;" class="icon" />
        </button>
      </div>
    </aside>
  </section>
</template>

<style scoped>
section {
  padding: calc(2 * var(--main-distance));
}

.go-back {
  position: absolute;
  top: var(2 * var(--main-distance));
  left: var(2 * var(--main-distance));
}

.test {
  margin-left: 50%;
  transform: translateX(-50%);
  display: grid;
  gap: calc(var(--main-distance) - 10px);
  justify-items: center;
  text-align: center;
  width: min-content;
  border: var(--main-border);
  border-radius: 30px;
  padding: var(--main-distance);
}

.question-number {
  justify-self: right;
}

.question {
  width: 600px;
  font-size: 24px;
}

.buttons {
  display: flex;
  gap: var(--main-distance);
}

button {
  position: relative;
  padding-inline: 30px;
}

button:hover {
  background-color: var(--main-color);
  border-color: var(--main-color);
}

button.back:hover {
  padding-right: 18px;
  padding-left: 42px;
}

button.next:hover {
  padding-right: 42px;
  padding-left: 18px;
}

button .icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
}

button.back .icon {
  left: 14px;
}

button.next .icon {
  right: 14px;
}

button:hover .icon {
  opacity: 1;
}

@media screen and (max-width: 1160px) {
  section {
    display: grid;
    gap: calc(2 * var(--main-distance));
  }

  .go-back {
    position: static;
  }
}

@media screen and (max-width: 768px) {
  .test {
    width: 100%;
    margin-left: unset;
    transform: unset;
  }

  .question {
    width: 100%;
    font-size: 20px;
  }

  textarea {
    width: 100%;
  }
}

@media screen and (max-width: 600px) {
  section {
    gap: var(--main-distance);
    padding: var(--main-distance);
  }

  .go-back {
    top: var(--main-distance);
    left: var(--main-distance);
  }
}
</style>
