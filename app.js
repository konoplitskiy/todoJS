document.addEventListener("DOMContentLoaded", function (event) {
    const addBtnTodoItem = document.querySelector('.task-add__btn');
    const modalTodo = document.querySelector('.todo-modal');
    const modalTodoInner = document.querySelector('.todo-modal__inner');
    const closeBtnModalTodo = document.querySelector('.todo-modal__close');
    const closeBtnPopUp = document.querySelector('.todo-modal-popUp__close');
    const addBtnPopUp = document.querySelector('.todo-modal-popUp__add');
    const fieldPopUp = document.querySelector('.todo-modal-popUp__field');
    const toDoList = document.querySelector('.todo-list');
    const filterNav = document.querySelector('.task-filter-list');
    const dataTasks = document.querySelectorAll('[data-tasks]');


    let listTask = [];
    let audio = new Audio('pencil.mp3')


    function modalOpen() {
        modalTodo.classList.add('is-active');
    }

    function modalClose() {
        modalTodo.classList.remove('is-active');
        fieldPopUp.value = '';
    }


    // функция которая создает элемент списка задач
    function createList(element) {
        if (element) {
            let taskItem = `
            <li class="todo-list__item ${element.status == 'is-completed' ? 'is-completed': ''}">
                <span class="todo-list__value">${element.value}</span>
                <div class="todo-list__action">
                    ${element.status == 'is-completed' ? '' : 
                    `
                    <button class="todo-list__completed">
                        <svg width="19" height="14" viewBox="0 0 19 14" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M18.3864 3.28699L8.39411 13.4362C7.65417 14.1879 6.45387 14.1879 5.71323 13.4362L0.555164 8.19635C-0.185055 7.4446 -0.185055 6.22522 0.555164 5.47332C1.29552 4.72128 2.49573 4.72128 3.23576 5.47304L7.05407 9.35164L15.7053 0.563816C16.4457 -0.188224 17.646 -0.187654 18.3861 0.563816C19.1262 1.31571 19.1262 2.53466 18.3864 3.28699Z"
                                fill="white" />
                        </svg>
                    </button>
                    `
                    }
                    <button class="todo-list__remove">
                        <svg width="18" height="20" viewBox="0 0 18 20" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.20382 5.95413V17.4941C2.20382 18.1762 2.45393 18.8167 2.89084 19.2763C3.32574 19.7372 3.93098 19.9988 4.56439 19.9999H13.4263C14.0599 19.9988 14.6652 19.7372 15.0999 19.2763C15.5368 18.8167 15.7869 18.1762 15.7869 17.4941V5.95413C16.6554 5.7236 17.2182 4.88454 17.102 3.99333C16.9857 3.1023 16.2266 2.43577 15.3279 2.43559H12.9298V1.85011C12.9325 1.35776 12.7379 0.884988 12.3893 0.537177C12.0408 0.189549 11.5673 -0.00402466 11.0749 5.06487e-07H6.91582C6.42347 -0.00402466 5.94996 0.189549 5.60142 0.537177C5.25288 0.884988 5.05821 1.35776 5.06095 1.85011V2.43559H2.66287C1.76416 2.43577 1.00505 3.1023 0.888688 3.99333C0.772507 4.88454 1.3353 5.7236 2.20382 5.95413ZM13.4263 19.0632H4.56439C3.76357 19.0632 3.14058 18.3752 3.14058 17.4941V5.9953H14.8501V17.4941C14.8501 18.3752 14.2272 19.0632 13.4263 19.0632ZM5.99772 1.85011C5.99461 1.60622 6.09048 1.37148 6.26356 1.19932C6.43646 1.02715 6.67175 0.932558 6.91582 0.936766H11.0749C11.319 0.932558 11.5543 1.02715 11.7272 1.19932C11.9003 1.3713 11.9961 1.60622 11.993 1.85011V2.43559H5.99772V1.85011ZM2.66287 3.37236H15.3279C15.7935 3.37236 16.1709 3.74981 16.1709 4.21544C16.1709 4.68108 15.7935 5.05853 15.3279 5.05853H2.66287C2.19723 5.05853 1.81978 4.68108 1.81978 4.21544C1.81978 3.74981 2.19723 3.37236 2.66287 3.37236Z"
                                fill="white" />
                        </svg>
                    </button>
                </div>
            </li>
        `
            toDoList.insertAdjacentHTML('beforeend', taskItem);
        }
    }


    function getLocalStorage() {
        let localObjString = localStorage.getItem('listItems');
        if (localObjString === 'undefined' || localObjString === null) {
            return todoItems = [];
        } else {
            let localObj = JSON.parse(localObjString);
            return localObj;
        }
    }


    function showListItems() {
        listTask = getLocalStorage();

        dataTasks.forEach(function (item) {
            if (item.getAttribute('data-tasks') === 'open' && item.classList.contains('is-active')) {
                toDoList.innerHTML = '';
                let tasksOpen = listTask.filter(function (item) {
                    return item.status === 'new'
                })

                tasksOpen.forEach(createList)

            } else if (item.getAttribute('data-tasks') === 'closed' && item.classList.contains('is-active')) {
                let tasksOpen = listTask.filter(function (item) {
                    return item.status === 'is-completed'
                })
                toDoList.innerHTML = '';
                tasksOpen.forEach(createList);

            } else if (item.getAttribute('data-tasks') === 'all' && item.classList.contains('is-active')) {
                toDoList.innerHTML = '';
                listTask.forEach(createList);
            }
        })

    }

    showListItems();


    // Добовляем каждый элемент в массив
    addBtnPopUp.addEventListener('click', () => {
        if (fieldPopUp.value.trim().length === 0) {
            let errorElement = document.createElement('span');
            errorElement.textContent = '*Поле не может быть пустым';
            errorElement.classList.add('error-field');
            if (!document.querySelector('.error-field')) {
                fieldPopUp.insertAdjacentElement('afterend', errorElement);
            }
        } else {

            let itemTask = {
                status: 'new',
                value: fieldPopUp.value
            }
            listTask = getLocalStorage();
            listTask.unshift(itemTask);
            localStorage.setItem('listItems', JSON.stringify(listTask));
            modalClose();
            showListItems();
        }
    })


    fieldPopUp.addEventListener('input', function () {
        if (document.querySelector('.error-field')) {
            document.querySelector('.error-field').remove();
        }
    })

    addBtnTodoItem.addEventListener('click', modalOpen);
    modalTodoInner.addEventListener('click', (event) => {
        let target = event.target;
        if (target === modalTodoInner || target === closeBtnModalTodo || target === closeBtnPopUp) {
            modalClose();
        }
    })

    toDoList.addEventListener('click', function (event) {
        let target = event.target;

        if (target.closest('.todo-list__completed')) {
            console.log('Сделано')

            let valueItem = target.parentElement.parentElement.closest('.todo-list__item').querySelector('.todo-list__value').textContent;
            let localDate = listTask;


            let me = localDate.map((item) => {
                if (item.value === valueItem) {
                    item.status = 'is-completed'
                }
                return item;
            })

            localStorage.setItem('listItems', JSON.stringify(me));
            showListItems();
            audio.play();

        }
        if (target.closest('.todo-list__remove')) {
            let valueItem = target.parentElement.parentElement.closest('.todo-list__item').querySelector('.todo-list__value').textContent;
            let localDate = listTask;
            console.log('Удалить')

            let se = localDate.filter((item) => {
                if (item.value !== valueItem) {
                    return item;
                }

            })

            localStorage.setItem('listItems', JSON.stringify(se));
            showListItems();
        }

    })


    // filter tasks
    filterNav.addEventListener('click', function (event) {
        let target = event.target;
        if (target.getAttribute('data-tasks') === 'open') {


            dataTasks.forEach(function (item) {
                item.classList.remove('is-active')
            })
            target.classList.add('is-active')
            showListItems();

        } else if (target.getAttribute('data-tasks') === 'closed') {

            dataTasks.forEach(function (item) {
                item.classList.remove('is-active')
            })
            target.classList.add('is-active')
            showListItems();

        } else {
            dataTasks.forEach(function (item) {
                item.classList.remove('is-active')
            })
            target.classList.add('is-active')
            showListItems();
        }
    })

});