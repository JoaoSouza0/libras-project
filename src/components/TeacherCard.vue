<template>
  <div id="card">
    <div class="teacher-image">
      <img src="https://avatars.githubusercontent.com/u/60666522?v=4" alt="" />
    </div>

    <div class="content">
      <h2>Prof.º Daniel</h2>
      <p>
        Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum
        est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan.
      </p>

      <div class="icon">
        <span class="image-container">
          <img src="@/assets/icon-messages.svg" />
        </span>
        <span class="image-container">
          <img src="@/assets/icon-teacher.svg" />
        </span>
        <span class="image-container">
          <img src="@/assets/icon-user.svg" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
#card {
  border-radius: 1.6rem;
  outline: 2px solid var(--input-secondary);
  width: 22.7rem;
  background-color: var(--input-secondary);
  margin: 0 10px;

  .teacher-image {
    position: relative;
    top: 2.3rem;

    img {
      width: 14rem;
      border-radius: 50%;
      border: 8px solid var(--text-primary);
      margin: 0 auto;
      display: block;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 50%;
    background-color: white;
    border-radius: 0 0 1.6rem 1.6rem;

    h2 {
      padding-top: 4.2rem;
      color: var(--text-dark);
      margin: 0 auto 1.6rem auto;
    }

    p {
      text-align: center;
      max-width: 20rem;
      font-size: 1.6rem;
      margin: 0 auto 1.6rem auto;
      color: var(--text-dark);
    }

    .icon {
      display: flex;
      justify-content: center;
      margin-bottom: 1.6rem;
      .image-container {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        margin: 0 0.5rem;
        padding: 0.5rem;
        border-radius: 0.5rem;

        background-color: var(--text-primary);

        img {
          width: 90%;
          display: block;
          margin: 0 auto;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
