<template>
    <div>
        <header class="container">
           <slot name="header">

           </slot>
        </header>
        <body class="container">
            <slot name="body"></slot>
        </body>
        <footer class="container">
            <slot name="footer"></slot>
        </footer>
    </div>
</template>