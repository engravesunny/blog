<template>
    <div class="mid_card box_border">
        <div class="left">
            <img src="https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/4.webp" alt="postImg">
        </div>
        <div class="main">
            <div class="top">
                <div class="title">
                    文章标题
                </div>
            </div>
            <div class="bottom">
                <div class="category"> <span class="iconfont icon">&#xe811;</span> 分类</div>
                <div class="tags">
                    <div class="tag"> <span class="iconfont icon">&#xe62f;</span>标签1</div>
                    <div class="tag"> <span class="iconfont icon">&#xe62f;</span>标签2</div>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="top">
                <div class="index">
                    <h1>1</h1>
                </div>
            </div>
            <div class="bottom">
                <div class="date">2023-05-05</div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.mid_card {
    width: 48%;
    min-height: 100px;
    display: flex;
    padding: 5px;
    border-radius: 10px;
    cursor: pointer;

    .left {
        width: 160px;
        height: 100%;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 5px;
        }
    }

    .main {
        margin-left: 5px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .icon {
            font-size: 14px;
            margin-right: 3px;
        }

        .top {
            padding-top: 5px;
            width: 100%;

            .title {
                font-size: 18px;
                font-weight: 700;
            }
        }

        .bottom {
            width: 100%;
            display: flex;
            flex-direction: column;
            font-size: 14px;
            font-weight: 700;

            .category {
                margin-bottom: 3px;
            }

            .tags {
                display: flex;
                justify-content: flex-start;
                align-items: center;

                .tag {
                    margin-right: 5px;
                    display: flex;
                    align-items: center;
                }
            }
        }
    }

    .right {
        width: 20%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .top {
            .index {
                opacity: .5;
                font-size: 18px;
                text-align: right;
                font-style: italic;
            }
        }

        .bottom {
            .date {
                text-align: right;
                font-size: 14px;
                font-weight: 700;
                color: var(--dark-gray);
            }
        }
    }
}
</style>