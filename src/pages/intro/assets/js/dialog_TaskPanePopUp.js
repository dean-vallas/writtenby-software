(function () {
    Office.Initialize = function () {
        $(document).ready(function () {
            $('#ok_buttonID').click(sendTextToParentPage);
        });
    }

    function sendTextToParentPage() {
        var textString = $('#text_boxID').val();
        Office.context.ui.messageParent(textString);
    }
}());