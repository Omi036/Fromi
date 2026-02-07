# -- Path setup --------------------------------------------------------------

import os
import sys
# sys.path.insert(0, os.path.abspath('.'))  # No necesitamos añadir nada del proyecto Node

# -- Project information -----------------------------------------------------

project = 'MiFramework'
author = 'Tu Nombre'
release = '0.1.0'

# -- General configuration ---------------------------------------------------

extensions = [
    'myst_parser',  # Para poder usar Markdown (.md) si quieres
]

templates_path = ['_templates']  # usualmente vacío
exclude_patterns = []

# -- Options for HTML output -------------------------------------------------

html_theme = 'sphinx_rtd_theme'  # Tema oficial de Read the Docs
html_static_path = ['_static']   # usualmente vacío