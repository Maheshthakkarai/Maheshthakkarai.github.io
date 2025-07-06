document.addEventListener('DOMContentLoaded', () => {
    const db = firebase.firestore();
    const auth = firebase.auth();

    const newPostSection = document.getElementById('new-post-section');
    const blogPostsSection = document.getElementById('blog-posts');
    const newPostForm = document.getElementById('new-post-form');

    // Function to fetch and display posts
    const renderPosts = async () => {
        blogPostsSection.innerHTML = ''; // Clear existing posts
        const snapshot = await db.collection('posts').orderBy('createdAt', 'desc').get();
        snapshot.forEach(doc => {
            const post = doc.data();
            const postElement = document.createElement('div');
            postElement.classList.add('bg-gray-100', 'dark:bg-gray-800', 'p-4', 'rounded-lg', 'mb-4');
            postElement.innerHTML = `
                <h3 class="text-2xl font-bold">${post.title}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Posted on ${post.createdAt.toDate().toLocaleDateString()}</p>
                <p class="mt-4">${post.content}</p>
            `;
            blogPostsSection.appendChild(postElement);
        });
    };

    // Show new post form to logged-in users
    auth.onAuthStateChanged(user => {
        if (user) {
            newPostSection.classList.remove('hidden');
        } else {
            newPostSection.classList.add('hidden');
        }
    });

    // Handle new post submission
    newPostForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        const user = auth.currentUser;

        if (title && content && user) {
            await db.collection('posts').add({
                title: title,
                content: content,
                authorId: user.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            newPostForm.reset();
            renderPosts(); // Re-render posts after adding a new one
        }
    });

    // Initial render of posts
    renderPosts();
});
