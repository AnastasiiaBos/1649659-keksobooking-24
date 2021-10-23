const form = document.querySelector('.ad-form');
const fieldsets = form.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFilter = mapFilters.querySelectorAll('.map__filter');

const deactivateForm = function () {
  form.classList.add('ad-form--disabled');
  fieldsets.forEach((fieldest) => {
    fieldest.disabled = true;
  });

  mapFilters.classList.add('map__filters--disabled');
  mapFilter.forEach((filter) => {
    filter.disabled = true;
  });
};

const activateForm = function () {
  form.classList.remove('ad-form--disabled');
  fieldsets.forEach((fieldest) => {
    fieldest.disabled = false;
  });

  mapFilters.classList.remove('map__filters--disabled');
  mapFilter.forEach((filter) => {
    filter.disabled = false;
  });
};

export {activateForm, deactivateForm};
