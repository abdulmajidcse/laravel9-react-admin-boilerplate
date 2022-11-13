@props(['text' => 'Please wait...'])
<div>
    <style>
        #loadingSpinnerParent {
            background: white;
            opacity: 0.8;
            height: 100vh;
            width: 100%;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 9999;
        }

        #loadingSpinner {
            position: relative;
            left: 50%;
            top: 45%;
        }

        @media only screen and (max-width: 600px) {
            #loadingSpinner {
                left: 25%;
            }
        }

    </style>
    <div id="loadingSpinnerParent">
        <button id="loadingSpinner" class="btn btn-danger" type="button">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            {{ $text }}
        </button>
    </div>
</div>
