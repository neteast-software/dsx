class Loading {
    private loadingCount = 0;
    show(title = "加载中") {
        if (this.loadingCount !== 0) return;
        uni.showLoading({ title, mask: true, success: () => this.loadingCount++ });
    }
    close() {
        if (this.loadingCount === 0) return;
        this.loadingCount--;
        if (this.loadingCount !== 0) return;
        uni.hideLoading();
    }
}

export default new Loading();
