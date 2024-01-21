-- departments table
INSERT INTO department (id, name) VALUES
(1, 'Gallerists 1'),
(2, 'Gallery Directors 2'),
(3, 'Gallery Technicians 3');

-- insert roles
INSERT INTO role (id, title, salary, department_id) VALUES
(1, 'Curatorial', 94000, 1),
(2, 'Education Specialist', 60000, 1),
(3, 'Collection Management', 160000, 1),
(4, 'Marketing', 97000, 2),
(5, 'Development', 100000, 2),
(6, 'Security', 38000, 3),
(7, 'Facilities', 70000, 3);

-- insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
(1, 'Leonardo', 'da Vinci', 1, 1),
(2, 'Vincent', 'Van Gogh', 2, 1),
(3, 'Claude', 'Monet', 3, 1),
(4, 'Jackson', 'Pollock', 4, 2),
(5, 'Salvador', 'Dalí', 5, 2),
(6, 'Henri', 'Matisse', 6, 3),
(7, 'Andy', 'Warhol', 7, 3);