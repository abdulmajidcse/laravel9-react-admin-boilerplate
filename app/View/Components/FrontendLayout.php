<?php

namespace App\View\Components;

use Illuminate\View\Component;

class FrontendLayout extends Component
{
    public $tabTitle;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($tabTitle)
    {
        $this->tabTitle = $tabTitle;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('layouts.frontend-layout');
    }
}
