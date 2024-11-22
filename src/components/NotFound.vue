<template>
  <div class="not-found">
    <div class="not-found__text">This is not what you are looking for</div>
    <router-link class="not-found__link" to="/">Go back to the main page</router-link>
  </div>
</template>

<style>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  gap: 20px;
  height: 500px;
}

.not-found__text {
  color: var(--text-main-color);
  transition: all 0.4s ease;
}

.not-found__link {
  color: var(--button-main-color);
  text-decoration: none;
  transition: all 0.4s ease;
}

.not-found__link:hover {
  text-decoration: underline;
}
</style>
