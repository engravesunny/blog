<template>
  <div>
    <el-card style="width: 55vw; height: 60vh">
      <template v-if="!isSignedIn">
        <el-button @click="handleClick">登录</el-button>
        <div class="sign-btn" style="transform: scale(0)">
          <SignInButton />
        </div>
      </template>
      <template v-else>
        <UserButton />
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { SignInButton, UserButton, useAuth } from "vue-clerk";

const { isSignedIn } = useAuth();
const handleClick = async () => {
  const sign = document.querySelector(".sign-btn");
  const btn = sign?.querySelector("button");
  btn?.click();
};
</script>

<style lang="scss" scoped></style>