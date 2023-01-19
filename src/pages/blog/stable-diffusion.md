---
title: "Notes on Stable Diffussion"
description: "The steps of stable diffusion"
pubDate: "Jan 19 2023"
postImage: ""
tags: ["stable diffusion", "Notes"]
layout: "../../layouts/BlogPostLayout.astro"
---

## Train a noise prediction model

- First, we create a dataset of training images by adding noise to the original images. We add different levels of noise to it (1,2, 3..)

- We train a U-Net to predict the noise in the image.

- When the model is trained, this model takes a *noisy* image and it predicts its noise. We can subtract the prediction from the original to get an image.

## Painting the image

- 

## Using latent space instead of pixel image

- 

## Text Encoding

- 

## Adding text to the image generation process

- 



Resources: (Illustrated Stable Diffusion)[https://jalammar.github.io/illustrated-stable-diffusion/]
