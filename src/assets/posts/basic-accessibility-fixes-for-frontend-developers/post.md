---
title: "Basic Accessibility Fixes for Frontend Developers"
subtitle: "Simple solutions for common problems"
date: 2025-03-02
slug: "basic-accessibility-fixes-for-frontend-developers"
tags: "accessibility"
infoPanel: {
  title: 'Intended audience',
  description: [
    'This article is written for frontend developers who are new to accessibility concepts.',
    'No prior accessibility knowledge is needed – just basic HTML, CSS, and JavaScript skills.'
  ]
}
---

Ever clicked on a button that didn't respond? Or tried navigating a website with your keyboard only to get stuck? These frustrating experiences are even worse for people with disabilities.

The good news? Many accessibility problems can be fixed with simple code changes. In this article, I'll break down the most common accessibility issues and how to fix them without complicating your development process.

## Do we really need to care about accessibility?

You might be thinking, "My app works fine, why bother?" Here's why it matters:

- It's the right thing to do – around 15-20% of people have some form of disability
- In many countries, it's required by law for certain websites
- It improves the experience for ALL users, not just those with disabilities
- It's good for SEO and can boost your search rankings

## What is web accessibility, and what problems does it solve?

Web accessibility means building websites that people with disabilities can use. This includes those with visual, motor, hearing, or cognitive impairments.

Think of accessibility like a ramp into a building. While it's essential for wheelchair users, it also helps people with strollers, delivery workers, and others. Similarly, web accessibility helps everyone, including:
- People using mobile devices
- Older users
- People with temporary limitations (like a broken arm)
- People in challenging environments (bright sunlight, noisy room)

## The POUR principles

Accessibility is built on four main principles, known as POUR:

1. **Perceivable**: Can all users perceive your content through available senses?
2. **Operable**: Can all users operate and navigate your interface?
3. **Understandable**: Can all users understand your content and interface?
4. **Robust**: Will your content work with various assistive technologies?

Let's look at some simple fixes for each area.

## Perceivable Content Fixes

### Images: Add alt text

```html
<!-- Bad -->
<img src="logo.png">

<!-- Good -->
<img src="logo.png" alt="Company Logo">

<!-- Best for decorative images -->
<img src="decorative-line.png" alt="">
```

Alt text is like a caption for images. Screen readers read this text aloud to describe what's in the image. If the image is purely decorative, use empty alt text (`alt=""`) so screen readers will skip it.

### Color contrast: Make text readable

Low contrast text is hard to read for everyone, especially those with visual impairments. The minimum contrast ratio should be:
- 4.5:1 for normal text
- 3:1 for large text (18pt or 14pt bold)

Use a contrast checker tool to verify your colors. Don't rely on color alone to convey information – add icons, patterns, or text labels.

## Operable Interface Fixes

### Keyboard navigation: Make everything accessible without a mouse

Many users navigate with keyboards only. Test your site by unplugging your mouse and trying to:
- Access all interactive elements using Tab
- Activate buttons and links with Enter
- Operate dropdowns with arrow keys

A common issue is missing focus styles:

```css
/* Bad - removing focus outline without replacement */
:focus {
  outline: none;
}

/* Good - custom focus style */
:focus {
  outline: 2px solid #4a90e2;
  outline-offset: 2px;
}
```

### Clickable areas: Make them big enough

Small click targets are hard for people with motor control issues. Buttons and links should be at least 44x44 pixels.

```css
.button {
  min-height: 44px;
  min-width: 44px;
  padding: 8px 16px;
}
```

## Understandable Content Fixes

### Form labels: Make them explicit

```html
<!-- Bad -->
<input type="text" placeholder="Enter your name">

<!-- Good -->
<label for="name">Name</label>
<input id="name" type="text">

<!-- Also good (for compact designs) -->
<label>
  Name
  <input type="text">
</label>
```

Labels are crucial for screen reader users. Placeholders aren't enough because they disappear when typing begins.

### Error messages: Make them helpful

```javascript
// Bad
function validateForm() {
  if (!isValid) {
    errorElement.textContent = "Invalid input!";
  }
}

// Good
function validateForm() {
  if (!isValid) {
    errorElement.textContent = "Please enter a valid email address (example@domain.com)";
    errorElement.setAttribute("role", "alert");
  }
}
```

Error messages should clearly explain what went wrong and how to fix it. Adding `role="alert"` ensures screen readers announce the error right away.

## Robust Code Fixes

### Semantic HTML: Use the right elements

```html
<!-- Bad -->
<div class="button" onclick="submitForm()">Submit</div>

<!-- Good -->
<button type="submit">Submit</button>
```

Semantic HTML gives browsers and assistive technologies important information about elements. Using the right elements (like `<button>`, `<nav>`, `<article>`) automatically provides accessibility features.

Think of it like this: a `<div>` is like a blank canvas – it has no meaning. A `<button>` comes with keyboard support, focus management, and screen reader announcements built-in.

### ARIA: Use it as a last resort

ARIA (Accessible Rich Internet Applications) attributes can enhance accessibility when HTML alone isn't enough:

```html
<!-- Example: Custom dropdown -->
<div role="combobox" aria-expanded="false" aria-controls="dropdown-list">
  Select an option
</div>
<ul id="dropdown-list" role="listbox" hidden>
  <li role="option">Option 1</li>
  <li role="option">Option 2</li>
</ul>
```

But remember the first rule of ARIA: "No ARIA is better than bad ARIA." Use native HTML elements whenever possible, and add ARIA only when necessary.

## Testing Your Fixes

Accessibility isn't a "set and forget" feature. Test regularly using:

1. Keyboard navigation: Put away your mouse and navigate your site
2. Screen readers: Try VoiceOver (Mac), NVDA or JAWS (Windows), or TalkBack (Android)
3. Automated tools: Use Lighthouse, axe, or WAVE to catch obvious issues
4. Zoom: Increase your browser zoom to 200% to check layout issues

Remember that automated tools only catch about 30% of accessibility issues. Manual testing is essential.

## Easy Wins for Better Accessibility

If you're short on time, focus on these high-impact fixes:

- Add proper alt text to all images
- Ensure sufficient color contrast
- Make sure all interactive elements work with a keyboard
- Use proper heading structure (h1, h2, etc.)
- Label all form controls correctly
- Use semantic HTML elements

Think of accessibility like performance optimization – it's easier to build it in from the start than retrofit it later.

## Conclusion

Making your websites accessible doesn't have to be complicated. These small changes make a huge difference for many users and improve the experience for everyone. Start with these basics, and you'll be well on your way to creating more inclusive websites.

Accessibility isn't about checking boxes to meet legal requirements – it's about removing barriers so everyone can use your site. And isn't that the whole point of the web?

## Additional resources

- [WebAIM - Web Accessibility In Mind](https://webaim.org/)
- [The A11Y Project](https://www.a11yproject.com/)
- [MDN Web Docs - Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Inclusive Components](https://inclusive-components.design/)